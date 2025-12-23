// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { User, Plant, UserPost } from '@/types';
// import { plantsData } from '@/data/plants';
// import { userPostsData } from '@/data/posts';

// interface AppContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   plants: Plant[];
//   posts: UserPost[];
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   toggleLikePlant: (plantId: string) => void;
//   toggleBookmarkPlant: (plantId: string) => void;
//   toggleLikePost: (postId: string) => void;
//   toggleBookmarkPost: (postId: string) => void;
//   addPost: (post: Omit<UserPost, 'id' | 'userId' | 'userName' | 'createdAt' | 'likes' | 'isApproved'>) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [plants, setPlants] = useState<Plant[]>(plantsData);
//   const [posts, setPosts] = useState<UserPost[]>(userPostsData);

//   const isAuthenticated = user !== null;

//   const login = async (email: string, password: string): Promise<boolean> => {
//     // Mock login - in production, this would connect to MongoDB
//     if (email && password) {
//       setUser({
//         id: 'user1',
//         name: 'Priya Sharma',
//         email: email,
//         avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
//         likedPlants: [],
//         bookmarkedPlants: [],
//         posts: [],
//       });
//       return true;
//     }
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     // Reset plant states
//     setPlants(plantsData.map(p => ({ ...p, isLiked: false, isBookmarked: false })));
//     setPosts(userPostsData.map(p => ({ ...p, isLiked: false, isBookmarked: false })));
//   };

//   const toggleLikePlant = (plantId: string) => {
//     setPlants(prev =>
//       prev.map(plant =>
//         plant.id === plantId
//           ? { ...plant, isLiked: !plant.isLiked, likes: plant.isLiked ? plant.likes - 1 : plant.likes + 1 }
//           : plant
//       )
//     );
//     if (user) {
//       setUser(prev => prev ? {
//         ...prev,
//         likedPlants: prev.likedPlants.includes(plantId)
//           ? prev.likedPlants.filter(id => id !== plantId)
//           : [...prev.likedPlants, plantId]
//       } : null);
//     }
//   };

//   const toggleBookmarkPlant = (plantId: string) => {
//     setPlants(prev =>
//       prev.map(plant =>
//         plant.id === plantId
//           ? { ...plant, isBookmarked: !plant.isBookmarked }
//           : plant
//       )
//     );
//     if (user) {
//       setUser(prev => prev ? {
//         ...prev,
//         bookmarkedPlants: prev.bookmarkedPlants.includes(plantId)
//           ? prev.bookmarkedPlants.filter(id => id !== plantId)
//           : [...prev.bookmarkedPlants, plantId]
//       } : null);
//     }
//   };

//   const toggleLikePost = (postId: string) => {
//     setPosts(prev =>
//       prev.map(post =>
//         post.id === postId
//           ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
//           : post
//       )
//     );
//   };

//   const toggleBookmarkPost = (postId: string) => {
//     setPosts(prev =>
//       prev.map(post =>
//         post.id === postId
//           ? { ...post, isBookmarked: !post.isBookmarked }
//           : post
//       )
//     );
//   };

//   const addPost = (post: Omit<UserPost, 'id' | 'userId' | 'userName' | 'createdAt' | 'likes' | 'isApproved'>) => {
//     if (!user) return;
//     const newPost: UserPost = {
//       ...post,
//       id: Date.now().toString(),
//       userId: user.id,
//       userName: user.name,
//       userAvatar: user.avatar,
//       createdAt: new Date(),
//       likes: 0,
//       isApproved: false, // Pending moderation
//       isLiked: false,
//       isBookmarked: false,
//     };
//     setPosts(prev => [newPost, ...prev]);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         plants,
//         posts,
//         login,
//         logout,
//         toggleLikePlant,
//         toggleBookmarkPlant,
//         toggleLikePost,
//         toggleBookmarkPost,
//         addPost,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// };








// import React, { createContext, useContext, useState, ReactNode } from "react";
// import { User, Plant, UserPost } from "@/types";
// import { plantsData } from "@/data/plants";
// import { userPostsData } from "@/data/posts";

// interface AppContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   plants: Plant[];
//   posts: UserPost[];
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
//   toggleLikePlant: (plantId: string) => void;
//   toggleBookmarkPlant: (plantId: string) => void;
//   toggleLikePost: (postId: string) => void;
//   toggleBookmarkPost: (postId: string) => void;
//   addPost: (
//     post: Omit<
//       UserPost,
//       | "id"
//       | "userId"
//       | "userName"
//       | "createdAt"
//       | "likes"
//       | "isApproved"
//       | "isLiked"
//       | "isBookmarked"
//     >
//   ) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [plants, setPlants] = useState<Plant[]>(plantsData);
//   const [posts, setPosts] = useState<UserPost[]>(userPostsData);

//   const isAuthenticated = user !== null;

//   // 🔐 LOGIN (Backend API)
//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) return false;

//       setUser({
//         id: data.user.id,
//         name: data.user.name,
//         email: data.user.email,
//         avatar:
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
//         likedPlants: [],
//         bookmarkedPlants: [],
//         posts: [],
//       });

//       return true;
//     } catch (error) {
//       console.error("Login failed:", error);
//       return false;
//     }
//   };

//   // 🚪 LOGOUT
//   const logout = () => {
//     setUser(null);

//     setPlants(
//       plantsData.map((p) => ({
//         ...p,
//         isLiked: false,
//         isBookmarked: false,
//       }))
//     );

//     setPosts(
//       userPostsData.map((p) => ({
//         ...p,
//         isLiked: false,
//         isBookmarked: false,
//       }))
//     );
//   };

//   // 🌱 LIKE PLANT
//   const toggleLikePlant = (plantId: string) => {
//     setPlants((prev) =>
//       prev.map((plant) =>
//         plant.id === plantId
//           ? {
//               ...plant,
//               isLiked: !plant.isLiked,
//               likes: plant.isLiked ? plant.likes - 1 : plant.likes + 1,
//             }
//           : plant
//       )
//     );

//     if (!user) return;

//     setUser((prev) =>
//       prev
//         ? {
//             ...prev,
//             likedPlants: prev.likedPlants.includes(plantId)
//               ? prev.likedPlants.filter((id) => id !== plantId)
//               : [...prev.likedPlants, plantId],
//           }
//         : null
//     );
//   };

//   // 🔖 BOOKMARK PLANT
//   const toggleBookmarkPlant = (plantId: string) => {
//     setPlants((prev) =>
//       prev.map((plant) =>
//         plant.id === plantId
//           ? { ...plant, isBookmarked: !plant.isBookmarked }
//           : plant
//       )
//     );

//     if (!user) return;

//     setUser((prev) =>
//       prev
//         ? {
//             ...prev,
//             bookmarkedPlants: prev.bookmarkedPlants.includes(plantId)
//               ? prev.bookmarkedPlants.filter((id) => id !== plantId)
//               : [...prev.bookmarkedPlants, plantId],
//           }
//         : null
//     );
//   };

//   // ❤️ LIKE POST
//   const toggleLikePost = (postId: string) => {
//     setPosts((prev) =>
//       prev.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               isLiked: !post.isLiked,
//               likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//             }
//           : post
//       )
//     );
//   };

//   // 🔖 BOOKMARK POST
//   const toggleBookmarkPost = (postId: string) => {
//     setPosts((prev) =>
//       prev.map((post) =>
//         post.id === postId
//           ? { ...post, isBookmarked: !post.isBookmarked }
//           : post
//       )
//     );
//   };

//   // ➕ ADD POST
//   const addPost = (
//     post: Omit<
//       UserPost,
//       | "id"
//       | "userId"
//       | "userName"
//       | "createdAt"
//       | "likes"
//       | "isApproved"
//       | "isLiked"
//       | "isBookmarked"
//     >
//   ) => {
//     if (!user) return;

//     const newPost: UserPost = {
//       ...post,
//       id: Date.now().toString(),
//       userId: user.id,
//       userName: user.name,
//       userAvatar: user.avatar,
//       createdAt: new Date(),
//       likes: 0,
//       isApproved: false,
//       isLiked: false,
//       isBookmarked: false,
//     };

//     setPosts((prev) => [newPost, ...prev]);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         plants,
//         posts,
//         login,
//         logout,
//         toggleLikePlant,
//         toggleBookmarkPlant,
//         toggleLikePost,
//         toggleBookmarkPost,
//         addPost,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // 🎯 CUSTOM HOOK
// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error("useApp must be used within AppProvider");
//   }
//   return context;
// };




import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User, Plant, UserPost } from "@/types";
import { plantsData } from "@/data/plants";
import { userPostsData } from "@/data/posts";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  plants: Plant[];
  posts: UserPost[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleLikePlant: (plantId: string) => void;
  toggleBookmarkPlant: (plantId: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  addPost: (
    post: Omit<
      UserPost,
      | "id"
      | "userId"
      | "userName"
      | "createdAt"
      | "likes"
      | "isApproved"
      | "isLiked"
      | "isBookmarked"
    >
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [plants, setPlants] = useState<Plant[]>(plantsData);
  const [posts, setPosts] = useState<UserPost[]>(userPostsData);

  const isAuthenticated = user !== null;

  // 🔐 LOGIN
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        likedPlants: [],
        bookmarkedPlants: [],
        posts: [],
      });

      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // 🔐 SIGNUP
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");

    setPlants(plantsData.map((p) => ({ ...p, isLiked: false, isBookmarked: false })));
    setPosts(userPostsData.map((p) => ({ ...p, isLiked: false, isBookmarked: false })));
  };

  // 🌱 LIKE PLANT
  const toggleLikePlant = (plantId: string) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.id === plantId
          ? { ...plant, isLiked: !plant.isLiked, likes: plant.isLiked ? plant.likes - 1 : plant.likes + 1 }
          : plant
      )
    );

    if (!user) return;

    setUser((prev) =>
      prev
        ? {
            ...prev,
            likedPlants: prev.likedPlants.includes(plantId)
              ? prev.likedPlants.filter((id) => id !== plantId)
              : [...prev.likedPlants, plantId],
          }
        : null
    );
  };

  // 🔖 BOOKMARK PLANT
  const toggleBookmarkPlant = (plantId: string) => {
    setPlants((prev) =>
      prev.map((plant) => (plant.id === plantId ? { ...plant, isBookmarked: !plant.isBookmarked } : plant))
    );

    if (!user) return;

    setUser((prev) =>
      prev
        ? {
            ...prev,
            bookmarkedPlants: prev.bookmarkedPlants.includes(plantId)
              ? prev.bookmarkedPlants.filter((id) => id !== plantId)
              : [...prev.bookmarkedPlants, plantId],
          }
        : null
    );
  };

  // ❤️ LIKE POST
  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  // 🔖 BOOKMARK POST
  const toggleBookmarkPost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post))
    );
  };

  // ➕ ADD POST
  const addPost = (
    post: Omit<
      UserPost,
      | "id"
      | "userId"
      | "userName"
      | "createdAt"
      | "likes"
      | "isApproved"
      | "isLiked"
      | "isBookmarked"
    >
  ) => {
    if (!user) return;

    const newPost: UserPost = {
      ...post,
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      createdAt: new Date(),
      likes: 0,
      isApproved: false,
      isLiked: false,
      isBookmarked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  // ✅ Fetch user on load if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        plants,
        posts,
        login,
        signup,
        logout,
        toggleLikePlant,
        toggleBookmarkPlant,
        toggleLikePost,
        toggleBookmarkPost,
        addPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 🎯 CUSTOM HOOK
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
