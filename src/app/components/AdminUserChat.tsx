// "use client";

// import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   collection, addDoc, query, orderBy, onSnapshot, serverTimestamp,
//   doc, updateDoc, setDoc, deleteDoc, Timestamp, FieldValue
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage, auth } from "@/lib/firebase";
// import { Send, Check, Image as ImageIcon, Trash2, Loader2, Users } from "lucide-react";

// interface Message {
//   id: string;
//   text: string;
//   imageUrl?: string;
//   senderId: string;
//   senderName: string;
//   createdAt: Timestamp;
//   deleted?: boolean;
// }

// interface ChatProps {
//   isAdmin: boolean;
//   adminUid: string; // FIXED: was a string-literal type, rejecting any real UID passed to it
// }

// export default function AdminUserChat({ isAdmin, adminUid }: ChatProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [otherTyping, setOtherTyping] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [lastRead, setLastRead] = useState<Record<string, Timestamp>>({});
//   const [uploading, setUploading] = useState(false);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [userList, setUserList] = useState<any[]>([]);
//   const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
//   const typingTimeout = useRef<NodeJS.Timeout | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const currentUserId = auth.currentUser?.uid;
//   const currentUserName = isAdmin ? "Admin" : "Guest";

//   const otherId = isAdmin ? activeChatUserId : adminUid;
//   const chatId = isAdmin && activeChatUserId ? `chat_${adminUid}_${activeChatUserId}` : `chat_${adminUid}_${currentUserId}`;
//   const otherName = isAdmin ? "User" : "Support";

//   // 1. Admin: load all users who chatted
//   useEffect(() => {
//     if (!isAdmin) return;
//     const q = query(collection(db, "chats"));
//     return onSnapshot(q, (snap) => {
//       const users = snap.docs
//         .filter(d => d.data().members?.includes(adminUid))
//         .map(d => {
//           const members = d.data().members;
//           const userId = members.find((id: string) => id !== adminUid);
//           return { id: userId, chatId: d.id, lastMessage: d.data().lastMessage }
//         });
//       setUserList(users);
//     });
//   }, [isAdmin, adminUid]);

//   // 2. Listen messages
//   useEffect(() => {
//     if (!chatId || !currentUserId) return;
//     const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
//     return onSnapshot(q, (snap) =>
//       setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Message)))
//     );
//   }, [chatId, currentUserId]);

//   // 3. Listen typing + lastRead
//   useEffect(() => {
//     if (!chatId || !otherId) return;
//     const unsubTyping = onSnapshot(doc(db, "chats", chatId, "typing", otherId), (snap) => {
//       setOtherTyping(snap.data()?.isTyping || false);
//     });
//     const unsubChat = onSnapshot(doc(db, "chats", chatId), (snap) => {
//       setLastRead(snap.data()?.lastRead || {});
//     });
//     return () => { unsubTyping(); unsubChat(); };
//   }, [chatId, otherId]);

//   // 4. Auto scroll + mark read
//   useEffect(() => {
//     if (!chatId || !currentUserId) return;
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });

//     const markAsRead = async () => {
//       await updateDoc(doc(db, "chats", chatId), {
//         [`lastRead.${currentUserId}`]: serverTimestamp() as FieldValue
//       });
//     };
//     markAsRead();
//   }, [messages, chatId, currentUserId]);

//   // 5. Typing
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//     if (!isTyping && chatId && currentUserId) {
//       setIsTyping(true);
//       setDoc(doc(db, "chats", chatId, "typing", currentUserId), { isTyping: true, updatedAt: serverTimestamp() });
//     }
//     if (typingTimeout.current) clearTimeout(typingTimeout.current);
//     typingTimeout.current = setTimeout(() => {
//       setIsTyping(false);
//       if (chatId && currentUserId) deleteDoc(doc(db, "chats", chatId, "typing", currentUserId));
//     }, 2000);
//   };

//   // 6. Image
//   const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setPreviewImage(URL.createObjectURL(file));
//   };

//   const uploadAndSendImage = async () => {
//     const file = fileInputRef.current?.files?.[0];
//     if (!file || !chatId) return;
//     setUploading(true);
//     const imageRef = ref(storage, `chats/${chatId}/${Date.now()}_${file.name}`);
//     const snap = await uploadBytes(imageRef, file);
//     const url = await getDownloadURL(snap.ref);

//     await addDoc(collection(db, "chats", chatId, "messages"), {
//       imageUrl: url, text: "", senderId: currentUserId, senderName: currentUserName, createdAt: serverTimestamp()
//     });
//     setUploading(false);
//     setPreviewImage(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   }

//   // 7. Delete
//   const handleDelete = async (messageId: string) => {
//     if (!chatId) return;
//     await updateDoc(doc(db, "chats", chatId, "messages", messageId), {
//       deleted: true, text: "This message was deleted", imageUrl: null
//     });
//   }

//   // 8. Send
//   const handleSend = async (e: FormEvent) => {
//     e.preventDefault();
//     if ((!input.trim() && !fileInputRef.current?.files?.[0]) || !chatId || !otherId || !currentUserId) return;

//     await setDoc(doc(db, "chats", chatId), {
//       members: [adminUid, isAdmin ? activeChatUserId : currentUserId],
//       createdAt: serverTimestamp()
//     }, { merge: true });

//     if (fileInputRef.current?.files?.[0]) {
//       await uploadAndSendImage();
//     } else {
//       await addDoc(collection(db, "chats", chatId, "messages"), {
//         text: input, senderId: currentUserId, senderName: currentUserName, createdAt: serverTimestamp()
//       });
//     }

//     await updateDoc(doc(db, "chats", chatId), {
//       lastMessage: input || "📷 Photo",
//       lastMessageAt: serverTimestamp()
//     });
//     setInput("");
//     deleteDoc(doc(db, "chats", chatId, "typing", currentUserId));
//     setIsTyping(false);
//   };

//   const isMessageSeen = (msg: Message) => {
//     if (!otherId) return false;
//     const otherLastRead = lastRead[otherId];
//     return otherLastRead && msg.createdAt && otherLastRead.toMillis() >= msg.createdAt.toMillis();
//   }

//   // Admin sidebar
//   if (isAdmin && !activeChatUserId) {
//     return (
//       <div className="w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
//         <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Users size={18} /> Support Inbox</h2>
//         {userList.length === 0 && <p className="text-sm text-slate-500">No chats yet</p>}
//         <div className="space-y-2">
//           {userList.map(u => (
//             <button key={u.id} onClick={() => setActiveChatUserId(u.id)}
//               className="w-full rounded-lg bg-slate-100 p-3 text-left hover:bg-slate-200">
//               <p className="font-medium">User: {u.id.slice(0, 6)}...</p>
//               <p className="text-xs text-slate-500 truncate">{u.lastMessage || "New chat"}</p>
//             </button>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex h-[600px] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">
//       <div className="border-b p-3 font-semibold">Chat with {otherName}</div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         <AnimatePresence initial={false}>
//           {messages.map((msg) => {
//             const isMe = msg.senderId === currentUserId;
//             const seen = isMe && isMessageSeen(msg);
//             return (
//               <motion.div key={msg.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                 className={`group relative flex ${isMe ? "justify-end" : "justify-start"}`}>
//                 <div className="flex flex-col items-end gap-1">
//                   <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? "rounded-br-sm bg-cyan-600 text-white" : "rounded-bl-sm bg-slate-100 text-slate-900"
//                     }`}>
//                     {msg.imageUrl && !msg.deleted && <img src={msg.imageUrl} alt="chat" className="mb-2 max-w-[200px] rounded-lg" />}
//                     <p className={`break-words ${msg.deleted ? "italic opacity-70" : ""}`}>{msg.text}</p>
//                   </div>
//                   {isMe && !msg.deleted && (
//                     <button onClick={() => handleDelete(msg.id)}
//                       className="absolute -top-2 -right-2 hidden rounded-full bg-slate-800 p-1 text-white opacity-0 transition group-hover:flex group-hover:opacity-100">
//                       <Trash2 size={12} />
//                     </button>
//                   )}
//                   {isMe && <div>{seen ? <Check size={14} className="text-cyan-600" /> : <Check size={14} className="text-slate-400" />}</div>}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//         <AnimatePresence>
//           {otherTyping && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-500">Typing...</motion.div>}
//         </AnimatePresence>
//         <div ref={bottomRef} />
//       </div>

//       <form onSubmit={handleSend} className="flex items-center gap-2 border-t p-3">
//         <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageSelect} className="hidden" />
//         <button type="button" onClick={() => fileInputRef.current?.click()}><ImageIcon size={20} /></button>
//         <input value={input} onChange={handleInputChange} placeholder="Type a message..." className="flex-1 rounded-full border px-4 py-2.5 text-sm" />
//         <button type="submit" disabled={uploading} className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white">
//           {uploading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
//         </button>
//       </form>
//     </div>
//   );
// }
