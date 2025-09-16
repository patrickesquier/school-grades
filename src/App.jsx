import React, { useState, useEffect } from 'react';

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

import { Login } from './compontents/Login';
import { Dashboard } from './compontents/Dashboard';
import { Loading } from './compontents/Loading';
import { appId, auth, db } from './firebase/config';


const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [gradeData, setGradeData] = useState({
        studentId: '',
        subjectId: '',
        unit: '',
        ac: '',
        p1: '',
        p2: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const isUserAdmin = currentUser.email === 'admin@colegio.com';
                setIsAdmin(isUserAdmin);

                const studentsRef = collection(db, `artifacts/${appId}/public/data/students`);
                const subjectsRef = collection(db, `artifacts/${appId}/public/data/subjects`);
                const classesRef = collection(db, `artifacts/${appId}/public/data/classes`);
                const gradesRef = collection(db, `artifacts/${appId}/public/data/grades`);
                const professorsRef = collection(db, `artifacts/${appId}/public/data/professors`);

                const unsubscribes = [
                    onSnapshot(studentsRef, (snapshot) => {
                        setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }),
                    onSnapshot(classesRef, (snapshot) => {
                        setClasses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }),
                    onSnapshot(subjectsRef, (snapshot) => {
                        setSubjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }),
                    onSnapshot(professorsRef, (snapshot) => {
                        setProfessors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    }),
                ];

                if (isUserAdmin) {
                    unsubscribes.push(onSnapshot(gradesRef, (snapshot) => {
                        const allGrades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setGrades(allGrades.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                    }));
                } else {
                    unsubscribes.push(onSnapshot(query(gradesRef, where('teacherId', '==', currentUser.uid)), (snapshot) => {
                        const teacherGrades = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setGrades(teacherGrades.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                    }));
                }

                setLoading(false);
                return () => unsubscribes.forEach(unsub => unsub());

            } else {
                setUser(null);
                setIsAdmin(false);
                setLoading(false);
                setStudents([]);
                setSubjects([]);
                setGrades([]);
                setClasses([]);
                setProfessors([]);
            }
        });
        return () => unsubscribeAuth();
    }, [isAdmin]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setLoginError('Erro ao fazer login. Verifique seu email e senha.');
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoginError("O cadastro manual está desativado. Por favor, utilize um dos emails pré-definidos para login.");
    };

    const handleAddGrade = async (event) => {
        event.preventDefault();
        setLoginError('');
        const { studentId, subjectId, unit, ac, p1, p2 } = gradeData;

        if (!studentId || !subjectId || !unit || ac === '' || p1 === '' || p2 === '') {
            setLoginError("Por favor, preencha todos os campos.");
            return;
        }

        const numericAc = parseFloat(ac);
        const numericP1 = parseFloat(p1);
        const numericP2 = parseFloat(p2);

        if (isNaN(numericAc) || isNaN(numericP1) || isNaN(numericP2) || numericAc < 0 || numericAc > 10 || numericP1 < 0 || numericP1 > 10 || numericP2 < 0 || numericP2 > 10) {
            setLoginError("As notas devem ser valores numéricos entre 0 e 10.");
            return;
        }

        const student = students.find(s => s.id === studentId)?.name;
        const subject = subjects.find(s => s.id === subjectId)?.name;
        const className = classes.find(c => c.name === selectedClass)?.name || selectedClass;

        if (!student || !subject) {
            setLoginError("Aluno ou matéria não encontrados. Por favor, tente novamente.");
            return;
        }

        try {
            const gradesRef = collection(db, `artifacts/${appId}/public/data/grades`);
            const newGradeData = {
                studentId,
                subjectId,
                studentName: student,
                subjectName: subject,
                className: className,
                unit,
                ac: numericAc,
                p1: numericP1,
                p2: numericP2,
                teacherId: user.uid,
                teacherEmail: user.email,
                createdAt: new Date().toISOString()
            };

            await addDoc(gradesRef, newGradeData);

            setGradeData({ studentId: '', subjectId: '', unit: '', ac: '', p1: '', p2: '' });
            setLoginError("");
        } catch (error) {
            console.error("Erro ao adicionar nota:", error);
            setLoginError("Ocorreu um erro ao adicionar a nota.");
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    const getGradeDisplayData = (grade) => {
        const student = students.find(s => s.id === grade.studentId);
        const subject = subjects.find(s => s.id === grade.subjectId);
        const teacher = professors.find(p => p.email === grade.teacherEmail);
        return {
            studentName: student ? student.name : grade.studentName,
            subjectName: subject ? subject.name : grade.subjectName,
            unit: grade.unit,
            ac: grade.ac,
            p1: grade.p1,
            p2: grade.p2,
            className: grade.className,
            teacherName: teacher ? teacher.name : 'Desconhecido'
        };
    };

    const latestGrades = grades.reduce((acc, currentGrade) => {
        const key = `${currentGrade.studentId}-${currentGrade.subjectId}-${currentGrade.unit}-${currentGrade.className}`;
        if (!acc[key] || new Date(currentGrade.createdAt) > new Date(acc[key].createdAt)) {
            acc[key] = currentGrade;
        }
        return acc;
    }, {});

    const latestGradesArray = Object.values(latestGrades);

    const filteredStudents = students.filter(student => student.class === selectedClass).sort((a, b) => a.name.localeCompare(b.name));

    const groupedGrades = latestGradesArray.reduce((acc, grade) => {
        const className = grade.className;
        const unit = grade.unit;

        if (!acc[className]) {
            acc[className] = {};
        }
        if (!acc[className][unit]) {
            acc[className][unit] = [];
        }
        acc[className][unit].push(grade);
        return acc;
    }, {});

    if (loading) return <Loading />;

    if (!user) {
        return <Login
            handleLogin={handleLogin}
            handleSignUp={handleSignUp}
            setEmail={setEmail}
            setPassword={setPassword}
            loginError={loginError}
            email={email}
            password={password}
        />;
    }

    return (
        <Dashboard
            user={user}
            handleLogout={handleLogout}
            isAdmin={isAdmin}
            professors={professors}
            students={students}
            subjects={subjects}
            classes={classes}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            gradeData={gradeData}
            setGradeData={setGradeData}
            handleAddGrade={handleAddGrade}
            latestGrades={latestGradesArray}
            loginError={loginError}
            getGradeDisplayData={getGradeDisplayData}
            filteredStudents={filteredStudents}
            groupedGrades={groupedGrades}
        />
    );
};

export default App;