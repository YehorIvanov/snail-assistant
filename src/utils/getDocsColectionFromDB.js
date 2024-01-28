import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

/**
 * Retrieves documents from a Firestore collection based on specified conditions.
 * @param {string} path - The path of the Firestore collection to retrieve documents from.
 * @param {number} [limited=500] - The maximum number of documents to retrieve.
 * @param {Array} [where1] - An array specifying the first condition to filter the documents.
 * @param {Array} [where2] - An array specifying the second condition to filter the documents.
 * @returns {Promise<Array>} - An array of document data that matches the specified conditions.
 */
const getDocsColectionFromDB = async (path, limited = 500, where1, where2) => {
  try {
    const queryConditions = [];
    if (where1) {
      queryConditions.push(where(where1[0], where1[1], where1[2]));
    }
    if (where2) {
      queryConditions.push(where(where2[0], where2[1], where2[2]));
    }

    const q = query(collection(db, path), ...queryConditions, limit(limited));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error.message);
  }
};
export default getDocsColectionFromDB;
