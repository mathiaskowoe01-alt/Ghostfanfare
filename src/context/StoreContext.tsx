"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CartItem, Order } from "@/lib/types";
import { getScoreById } from "@/lib/catalog";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: "success" | "info" | "error";
}

export interface MemberUser {
  name: string;
  email: string;
  instrument: string;
  fanfare: string;
}

interface StoreContextValue {
  cart: CartItem[];
  favorites: string[];
  unlockedIds: string[];
  orders: Order[];
  user: MemberUser | null;
  toasts: ToastItem[];
  addToCart: (scoreId: string) => void;
  removeFromCart: (scoreId: string) => void;
  clearCart: () => void;
  isInCart: (scoreId: string) => boolean;
  isUnlocked: (scoreId: string) => boolean;
  toggleFavorite: (scoreId: string) => void;
  isFavorite: (scoreId: string) => boolean;
  completeCheckout: (paymentMethod: Order["paymentMethod"], buyerEmail: string, buyerName: string) => Order;
  loginDemo: (custom?: Partial<MemberUser>) => void;
  logout: () => void;
  pushToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const STORAGE_KEY = "ghostfanfare_store_v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>(["fanfare-soleil-royal"]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>(["routine-aigus-sib"]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<MemberUser | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.cart)) setCart(parsed.cart);
        if (Array.isArray(parsed.favorites)) setFavorites(parsed.favorites);
        if (Array.isArray(parsed.unlockedIds)) setUnlockedIds(parsed.unlockedIds);
        if (Array.isArray(parsed.orders)) setOrders(parsed.orders);
        if (parsed.user) setUser(parsed.user);
      }
    } catch {
      // Ignore storage read errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, favorites, unlockedIds, orders, user })
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [cart, favorites, unlockedIds, orders, user, hydrated]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { ...toast, id }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4200);
    },
    []
  );

  const isInCart = useCallback(
    (scoreId: string) => cart.some((item) => item.scoreId === scoreId),
    [cart]
  );

  const isUnlocked = useCallback(
    (scoreId: string) => unlockedIds.includes(scoreId),
    [unlockedIds]
  );

  const isFavorite = useCallback(
    (scoreId: string) => favorites.includes(scoreId),
    [favorites]
  );

  const addToCart = useCallback(
    (scoreId: string) => {
      const score = getScoreById(scoreId);
      if (!score) return;
      if (unlockedIds.includes(scoreId)) {
        pushToast({
          title: "Déjà dans votre bibliothèque",
          description: `${score.title} est déjà débloqué dans votre Espace Fanfariste.`,
          variant: "info",
        });
        return;
      }
      setCart((prev) => {
        if (prev.some((i) => i.scoreId === scoreId)) {
          pushToast({
            title: "Déjà dans le panier",
            description: score.title,
            variant: "info",
          });
          return prev;
        }
        pushToast({
          title: "Ajouté au panier",
          description: `${score.title} — PDF + pistes par pupitre`,
          variant: "success",
        });
        return [...prev, { scoreId, addedAt: new Date().toISOString() }];
      });
    },
    [unlockedIds, pushToast]
  );

  const removeFromCart = useCallback((scoreId: string) => {
    setCart((prev) => prev.filter((i) => i.scoreId !== scoreId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback(
    (scoreId: string) => {
      const score = getScoreById(scoreId);
      setFavorites((prev) => {
        const exists = prev.includes(scoreId);
        if (score) {
          pushToast({
            title: exists ? "Retiré des favoris" : "Ajouté aux favoris",
            description: score.title,
            variant: "info",
          });
        }
        return exists ? prev.filter((id) => id !== scoreId) : [...prev, scoreId];
      });
    },
    [pushToast]
  );

  const completeCheckout = useCallback(
    (paymentMethod: Order["paymentMethod"], buyerEmail: string, buyerName: string): Order => {
      const items = cart
        .map((c) => {
          const s = getScoreById(c.scoreId);
          return s ? { scoreId: s.id, title: s.title, priceFcfa: s.priceFcfa } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

      const totalFcfa = items.reduce((sum, item) => sum + item.priceFcfa, 0);
      const order: Order = {
        id: `GF-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        items,
        totalFcfa,
        paymentMethod,
        status: "Payé & Débloqué",
      };

      setOrders((prev) => [order, ...prev]);
      setUnlockedIds((prev) => Array.from(new Set([...prev, ...items.map((i) => i.scoreId)])));
      setCart([]);
      if (!user) {
        setUser({
          name: buyerName || "Fanfariste GhostFanfare",
          email: buyerEmail,
          instrument: "Trompette Si♭",
          fanfare: "Fanfare Royale de Cotonou",
        });
      }

      pushToast({
        title: `Commande ${order.id} confirmée`,
        description: "Vos portées PDF et pistes par pupitre sont débloquées dans Mon Espace.",
        variant: "success",
      });

      return order;
    },
    [cart, user, pushToast]
  );

  const loginDemo = useCallback(
    (custom?: Partial<MemberUser>) => {
      const nextUser: MemberUser = {
        name: custom?.name || "Marc-Olivier K.",
        email: custom?.email || "trompette@ghostfanfare.com",
        instrument: custom?.instrument || "Trompette 1 (Si♭)",
        fanfare: custom?.fanfare || "Brass Band Atlantique",
      };
      setUser(nextUser);
      pushToast({
        title: `Bienvenue, ${nextUser.name}`,
        description: "Accès instantané à vos portées et pistes studio.",
        variant: "success",
      });
    },
    [pushToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    pushToast({
      title: "Déconnexion effectuée",
      description: "À bientôt en répétition.",
      variant: "info",
    });
  }, [pushToast]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        unlockedIds,
        orders,
        user,
        toasts,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isUnlocked,
        toggleFavorite,
        isFavorite,
        completeCheckout,
        loginDemo,
        logout,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
