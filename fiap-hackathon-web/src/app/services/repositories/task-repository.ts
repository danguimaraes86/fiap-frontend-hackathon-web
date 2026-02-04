import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
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
      return {
        ...doc.data(),
        id: doc.id,
      } as Task;
    });
  }

  async createTask(task: Partial<Task>) {
    const docRef = await addDoc(this._taskCollection, task);
    return docRef.id;
  }

  async updateTask(docId: string, task: Partial<Task>) {
    return await updateDoc(doc(this._taskCollection, docId), task)
  }

  async deleteTask(taskId: string) {
    return await deleteDoc(doc(this._taskCollection, taskId))
  }
}
