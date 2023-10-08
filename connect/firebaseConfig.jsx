import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSrRwEh9tQokAl-bzjZ7GWDeX5B_bpGiY",
    authDomain: "livetask-680a1.firebaseapp.com",
    projectId: "livetask-680a1",
    storageBucket: "livetask-680a1.appspot.com",
    messagingSenderId: "986750069515",
    appId: "1:986750069515:web:1f8038c64cf283c221100e",
    measurementId: "G-5KHYF8TSBL",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export function createUser(mail, password) {
  return new Promise((res, rej) => {
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        res(userCredential.user);
      })
      .catch((error) => {
        rej(error);
      });
  });
}

export function connectUser(mail, password) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        res(userCredential.user);
      })
      .catch((error) => {
        rej(error);
      });
  });
}

// Column CRUD

export async function createColumn (columnName) {
  const newColumnData = {
    name: columnName,
  };

  try {
    const docRef = await addDoc(collection(db, "column"), newColumnData);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création de la colonne :", error);
    return null;
  }
};

export async function fetchColumns (){
  const columnsRef = collection(db, "column");
  const querySnapshot = await getDocs(columnsRef);
  const columns = [];

  querySnapshot.forEach((doc) => {
    columns.push({ id: doc.id, ...doc.data() });
  });

  return columns;
};

export async function updateColumn (columnId, newName) {
  const columnRef = doc(db, "column", columnId);
  const updatedData = {
    name: newName,
  };

  try {
    await setDoc(columnRef, updatedData, { merge: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la colonne :", error);
  }
};

export async function deleteColumn (columnId) {
  const columnRef = doc(db, "column", columnId);

  try {
    await deleteDoc(columnRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de la colonne :", error);
  }
};

// Task CRUD

const createTask = async (taskContent, columnId) => {
  const newTaskData = {
    content: taskContent,
    id_column: columnId,
  };

  try {
    const docRef = await addDoc(collection(db, "livetask_db"), newTaskData);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    return null;
  }
};

const fetchTasksForColumn = async (columnId) => {
  const tasksRef = collection(db, "livetask_db");
  const queryByColumn = query(tasksRef, where("id_column", "==", columnId));
  const querySnapshot = await getDocs(queryByColumn);
  const tasks = [];

  querySnapshot.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });

  return tasks;
};

const updateTask = async (taskId, newContent) => {
  const taskRef = doc(db, "livetask_db", taskId);
  const updatedData = {
    content: newContent,
  };

  try {
    await setDoc(taskRef, updatedData, { merge: true });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
  }
};

const deleteTask = async (taskId) => {
  const taskRef = doc(db, "livetask_db", taskId);

  try {
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error);
  }
};
