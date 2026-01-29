import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { firebaseApp } from '../../configs/firebase.config';
import { Task } from '../../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskRepository {
  private _db = getFirestore(firebaseApp);
  private _taskCollection = collection(this._db, 'tasks')

  async getAllTasksByUserId(userId: string) {
    const querySnapshot = await getDocs(query(
      this._taskCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ));
    return querySnapshot.docs.map(doc => {
      return { ...doc.data() } as Task
    });
  }

  async createTask(task: Omit<Task, 'id' | 'completedAt'>) {
    const doc = await addDoc(this._taskCollection, this.normalizeObjects(task))
    return doc.id
  }

  private normalizeObjects(task: any) {
    return Object.fromEntries(
      Object.entries(task).filter(([_, value]) => value !== undefined && value !== null)
    );
  }

  // async updateTransaction(docId: string, data: any) {
  //   const docRef = doc(this._taskCollection, docId);
  //   return await updateDoc(docRef, data)
  // }

  // async deleteTransaction(docId: string) {
  //   const docRef = doc(this._taskCollection, docId);
  //   return await deleteDoc(docRef)
  // }
}
