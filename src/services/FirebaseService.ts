
import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "@/integrations/firebase/config";
import { User, UserRole, Case, Message, CaseStatus } from "@/types";

// Helper to convert Firestore document to User
const convertToUser = (doc: any): User => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    email: data.email,
    role: data.role,
    avatarUrl: data.avatarUrl,
    phone: data.phone,
    address: data.address,
    specialization: data.specialization,
    governmentId: data.governmentId,
    // Role-specific fields
    barId: data.barId,
    yearsOfExperience: data.yearsOfExperience,
    chamberNumber: data.chamberNumber,
    courtDistrict: data.courtDistrict,
    yearsOnBench: data.yearsOnBench,
    courtId: data.courtId,
    department: data.department
  };
};

// Helper to convert Firestore document to Case
const convertToCase = (doc: any): Case => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    caseNumber: data.caseNumber,
    status: data.status as CaseStatus,
    clientId: data.clientId,
    lawyerId: data.lawyerId,
    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
    nextHearingDate: data.nextHearingDate,
    filedDate: data.filedDate,
    courtRoom: data.courtRoom,
    judgeName: data.judgeName,
    defendantInfo: data.defendantInfo,
    judgement: data.judgement,
    type: data.type,
    judgeId: data.judgeId,
    filingDate: data.filingDate,
    documents: data.documents || [],
    parties: data.parties || []
  };
};

class FirebaseService {
  // Authentication
  async signUp(email: string, password: string, userData: Partial<User>): Promise<User> {
    try {
      // Create the user auth account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Update display name
      if (userData.name) {
        await updateProfile(userCredential.user, {
          displayName: userData.name
        });
      }
      
      // Save user data to Firestore
      const userRef = doc(db, "users", uid);
      const userObject = {
        id: uid,
        email,
        name: userData.name || email.split('@')[0],
        role: userData.role || 'client',
        avatarUrl: userData.avatarUrl || `https://ui-avatars.com/api/?name=${userData.name || email.split('@')[0]}&background=random`,
        phone: userData.phone || '',
        address: userData.address || '',
        governmentId: userData.governmentId || { type: '', number: '' },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // Role-specific fields
        specialization: userData.specialization || '',
        barId: userData.barId || '',
        yearsOfExperience: userData.yearsOfExperience || '',
        chamberNumber: userData.chamberNumber || '',
        courtDistrict: userData.courtDistrict || '',
        yearsOnBench: userData.yearsOnBench || '',
        courtId: userData.courtId || '',
        department: userData.department || ''
      };
      
      await setDoc(userRef, userObject);
      
      return {
        ...userObject,
        id: uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User;
    } catch (error) {
      console.error("Error in signUp:", error);
      throw error;
    }
  }
  
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Get user data from Firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        throw new Error("User data not found");
      }
      
      return convertToUser(userSnap);
    } catch (error) {
      console.error("Error in signIn:", error);
      throw error;
    }
  }
  
  async signOut(): Promise<void> {
    return signOut(auth);
  }
  
  async updateUser(userData: User): Promise<User> {
    try {
      const userRef = doc(db, "users", userData.id);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
      
      return userData;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  }
  
  // Users
  async getUserById(userId: string): Promise<User | null> {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        return null;
      }
      
      return convertToUser(userSnap);
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;
    }
  }
  
  async getUsersByRole(role: UserRole): Promise<User[]> {
    try {
      const usersQuery = query(collection(db, "users"), where("role", "==", role));
      const usersSnap = await getDocs(usersQuery);
      
      const users: User[] = [];
      usersSnap.forEach(doc => {
        users.push(convertToUser(doc));
      });
      
      return users;
    } catch (error) {
      console.error("Error in getUsersByRole:", error);
      throw error;
    }
  }
  
  // Cases
  async createCase(caseData: Partial<Case>): Promise<Case> {
    try {
      // Generate a case number if not provided
      if (!caseData.caseNumber) {
        caseData.caseNumber = `CV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
      
      const newCaseRef = await addDoc(collection(db, "cases"), {
        ...caseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: caseData.status || 'pending'
      });
      
      const newCaseSnap = await getDoc(newCaseRef);
      return {
        ...newCaseSnap.data(),
        id: newCaseRef.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as Case;
    } catch (error) {
      console.error("Error in createCase:", error);
      throw error;
    }
  }
  
  async getCaseById(caseId: string): Promise<Case | null> {
    try {
      const caseRef = doc(db, "cases", caseId);
      const caseSnap = await getDoc(caseRef);
      
      if (!caseSnap.exists()) {
        return null;
      }
      
      return convertToCase(caseSnap);
    } catch (error) {
      console.error("Error in getCaseById:", error);
      throw error;
    }
  }
  
  async getCasesByClientId(clientId: string): Promise<Case[]> {
    try {
      const casesQuery = query(collection(db, "cases"), where("clientId", "==", clientId));
      const casesSnap = await getDocs(casesQuery);
      
      const cases: Case[] = [];
      casesSnap.forEach(doc => {
        cases.push(convertToCase(doc));
      });
      
      return cases;
    } catch (error) {
      console.error("Error in getCasesByClientId:", error);
      throw error;
    }
  }
  
  async getCasesByLawyerId(lawyerId: string): Promise<Case[]> {
    try {
      const casesQuery = query(collection(db, "cases"), where("lawyerId", "==", lawyerId));
      const casesSnap = await getDocs(casesQuery);
      
      const cases: Case[] = [];
      casesSnap.forEach(doc => {
        cases.push(convertToCase(doc));
      });
      
      return cases;
    } catch (error) {
      console.error("Error in getCasesByLawyerId:", error);
      throw error;
    }
  }
  
  async updateCase(caseData: Case): Promise<Case> {
    try {
      const caseRef = doc(db, "cases", caseData.id);
      await updateDoc(caseRef, {
        ...caseData,
        updatedAt: serverTimestamp()
      });
      
      return caseData;
    } catch (error) {
      console.error("Error in updateCase:", error);
      throw error;
    }
  }
  
  // Messages
  async createMessage(messageData: Partial<Message>): Promise<Message> {
    try {
      const newMessageRef = await addDoc(collection(db, "messages"), {
        ...messageData,
        read: false,
        createdAt: serverTimestamp()
      });
      
      const newMessageSnap = await getDoc(newMessageRef);
      return {
        ...newMessageSnap.data(),
        id: newMessageRef.id,
        createdAt: new Date().toISOString()
      } as Message;
    } catch (error) {
      console.error("Error in createMessage:", error);
      throw error;
    }
  }
  
  async getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<Message[]> {
    try {
      // Get messages where user1 is sender and user2 is recipient
      const query1 = query(
        collection(db, "messages"), 
        where("senderId", "==", user1Id),
        where("recipientId", "==", user2Id)
      );
      
      // Get messages where user2 is sender and user1 is recipient
      const query2 = query(
        collection(db, "messages"), 
        where("senderId", "==", user2Id),
        where("recipientId", "==", user1Id)
      );
      
      const [snap1, snap2] = await Promise.all([getDocs(query1), getDocs(query2)]);
      
      const messages: Message[] = [];
      snap1.forEach(doc => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString()
        } as Message);
      });
      
      snap2.forEach(doc => {
        const data = doc.data();
        messages.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString()
        } as Message);
      });
      
      // Sort by createdAt in descending order (newest first)
      return messages.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error("Error in getMessagesBetweenUsers:", error);
      throw error;
    }
  }
  
  // File handling
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error in uploadFile:", error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
