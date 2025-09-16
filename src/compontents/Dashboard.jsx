import React from 'react';
import { Title } from './Title';

export function Dashboard({ user, handleLogout, isAdmin, professors, students, subjects, classes, selectedClass, setSelectedClass, gradeData, setGradeData, handleAddGrade, latestGrades, loginError, getGradeDisplayData, filteredStudents, groupedGrades }) {
    const userName = professors.find(p => p.email === user.email)?.name || 'Professor(a)';

    return (
        <div className="bg-gray-100 min-h-screen p-2 sm:p-4 font-sans">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <Title userName={userName} userUid={user.uid} handleLogout={handleLogout} />

                {!isAdmin && (
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Adicionar Nova Nota</h2>
                        <form onSubmit={handleAddGrade} className="space-y-3 sm:space-y-4">
                            <select
                                id="class"
                                value={selectedClass}
                                onChange={(e) => {
                                    setSelectedClass(e.target.value);
                                    setGradeData(prevState => ({ ...prevState, studentId: '' }));
                                }}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                required
                            >
                                <option value="">Selecione a Turma</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.name}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="studentId"
                                value={gradeData.studentId}
                                onChange={e => setGradeData(prev => ({ ...prev, studentId: e.target.value }))}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                required
                                disabled={!selectedClass}
                            >
                                <option value="">Selecione o Aluno</option>
                                {filteredStudents.map(student => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="subjectId"
                                value={gradeData.subjectId}
                                onChange={e => setGradeData(prev => ({ ...prev, subjectId: e.target.value }))}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                required
                            >
                                <option value="">Selecione a Matéria</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                id="unit"
                                value={gradeData.unit}
                                onChange={e => setGradeData(prev => ({ ...prev, unit: e.target.value }))}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                required
                            >
                                <option value="">Selecione a Unidade</option>
                                <option value="1">1ª Unidade</option>
                                <option value="2">2ª Unidade</option>
                                <option value="3">3ª Unidade</option>
                                <option value="4">4ª Unidade</option>
                            </select>
                            <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                <input
                                    type="number"
                                    id="ac"
                                    placeholder="Nota AC (0-10)"
                                    value={gradeData.ac}
                                    onChange={e => setGradeData(prev => ({ ...prev, ac: e.target.value }))}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                    required
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                                <input
                                    type="number"
                                    id="p1"
                                    placeholder="Nota P1 (0-10)"
                                    value={gradeData.p1}
                                    onChange={e => setGradeData(prev => ({ ...prev, p1: e.target.value }))}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                    required
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                                <input
                                    type="number"
                                    id="p2"
                                    placeholder="Nota P2 (0-10)"
                                    value={gradeData.p2}
                                    onChange={e => setGradeData(prev => ({ ...prev, p2: e.target.value }))}
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                                    required
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                            </div>
                            <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md text-sm">
                                Adicionar Nota
                            </button>
                            {loginError && <p className="text-sm text-red-500 mt-4 text-center">{loginError}</p>}
                        </form>
                    </div>
                )}

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Notas Lançadas</h2>
                    {latestGrades.length === 0 ? (
                        <p className="text-center text-gray-500 italic text-sm">Nenhuma nota lançada ainda.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Aluno</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Turma</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Matéria</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Unidade</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">AC</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">P1</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">P2</th>
                                        <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Adicionado por</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-xs sm:text-sm font-light">
                                    {latestGrades.filter(grade => isAdmin || grade.teacherId === user.uid).map(grade => {
                                        const displayData = getGradeDisplayData(grade);
                                        return (
                                            <tr key={grade.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">{displayData.studentName}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.className}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.subjectName}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.unit}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.ac}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.p1}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.p2}</td>
                                                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.teacherName}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {isAdmin && latestGrades.length > 0 && (
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Relatório de Notas Completo</h2>
                        <div className="space-y-4 sm:space-y-6">
                            {Object.entries(groupedGrades).map(([className, units]) => (
                                <div key={className}>
                                    <h3 className="text-md sm:text-lg font-bold text-gray-700 mb-2">{className}</h3>
                                    {Object.entries(units).sort(([unitA], [unitB]) => parseInt(unitA) - parseInt(unitB)).map(([unit, unitGrades]) => (
                                        <div key={unit} className="mt-4">
                                            <h4 className="text-sm sm:text-md font-semibold text-gray-600 mb-2">Unidade {unit}</h4>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
                                                    <thead>
                                                        <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Aluno</th>
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Matéria</th>
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">AC</th>
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">P1</th>
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">P2</th>
                                                            <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Adicionado por</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-600 text-xs sm:text-sm font-light">
                                                        {unitGrades.map(grade => {
                                                            const displayData = getGradeDisplayData(grade);
                                                            return (
                                                                <tr key={grade.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">{displayData.studentName}</td>
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.subjectName}</td>
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.ac}</td>
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.p1}</td>
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.p2}</td>
                                                                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">{displayData.teacherName}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}