import { firestore as bd } from './../firebase'

export async function getWorkoutLogs(log) {
    const collection = bd.collection('WorkoutLogs');
    if (log == 'all') {
        let workoutLogs = [];
        const snapshot = await collection.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return 'No matching documents.';
        }
        snapshot.forEach(doc => {
            let log = {
                id: doc.id,
                Name: doc.data().Name,
                Monday: doc.data().Monday,
                Tuesday: doc.data().Tuesday,
                Wednesday: doc.data().Wednesday,
                Thursday: doc.data().Thursday,
                Friday: doc.data().Friday,
            }
            workoutLogs.push(log)
        })
        return workoutLogs
    } else {
        let workoutLog = {}
        console.log(log)

        const snapshot = await collection.where("Name", "==", log).get()
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach(doc => {
            workoutLog = {
                id: doc.id,
                Name: doc.data().Name,
                Monday: doc.data().Monday,
                Tuesday: doc.data().Tuesday,
                Wednesday: doc.data().Wednesday,
                Thursday: doc.data().Thursday,
                Friday: doc.data().Friday,
            }
        })
        return workoutLog;
    }
}

export async function getExercisesList(muscleGroup) {
    let list = [];
        await bd.collection(muscleGroup)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let exercise = {
                    label: doc.id,
                    value: doc.data().Name,
                }
                list.push(exercise);
            })
        }).catch(error => {
            Alert.alert("Erro", error.code, error.message)
        })
        return list
}

export async function getUsers(find, role) {
    const collection = bd.collection('Users');
    if (find == 'all') {
        let users = [];
        const snapshot = await collection.where('Role', '==', role).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        snapshot.forEach(doc => {
            let user = {
                id: doc.id,
                Name: doc.data().Name,
                Role: doc.data().Role,
                Email: doc.data().Email,
                WorkoutLog: doc.data().WorkoutLog,
                Telephone: doc.data().Telephone,
            }
            users.push(user)
        })
        return users
    } else {
        let user = {};
        const snapshot = await collection.where('Email', '==', find).get();
        if (snapshot.empty) {
            return 'No matching documents.'
        }
        snapshot.forEach(doc => {
            user = {
                id: doc.id,
                Name: doc.data().Name,
                Role: doc.data().Role,
                Email: doc.data().Email,
                WorkoutLog: doc.data().WorkoutLog,
                Telephone: doc.data().Telephone,
            }
        })
        return user
    }
}


