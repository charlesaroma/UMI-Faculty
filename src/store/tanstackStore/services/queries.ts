import { useQuery } from '@tanstack/react-query';
import { getAllStudents, getFacultyProfile, getStudent, getStudentStatuses, getStudentProposals, getProposal } from './api.js';

export const useGetFacultyProfile = () => {
  return useQuery({
    queryKey: ['facultyProfile'],
    queryFn: getFacultyProfile,
    retry: false,
    refetchOnWindowFocus: false
  });
};

/* ********** STUDENT MANAGEMENT ********** */

export const useGetAllStudents = () => {
  return useQuery({
    queryKey: ['allStudents'],
    queryFn: getAllStudents,
    retry: false,
    refetchOnWindowFocus: false
  });
};


export const useGetStudent = (studentId: string) => {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudent(studentId),
    retry: false,
    refetchOnWindowFocus: false
  });
};

export const useGetStudentStatuses = (studentId: string) => {
  return useQuery({
    queryKey: ['studentStatuses', studentId],
    queryFn: () => getStudentStatuses(studentId),
    retry: false,
    refetchOnWindowFocus: false
  });
};

/* ********** END OF STUDENT MANAGEMENT ********** */

/* ********** PROPOSAL MANAGEMENT ********** */

export const useGetStudentProposals = (studentId: string) => {
  return useQuery({
    queryKey: ['studentProposals', studentId],
    queryFn: () => getStudentProposals(studentId),
    retry: false,
    refetchOnWindowFocus: false
  });
};

export const useGetProposal = (studentId: string, proposalId: string) => {
  return useQuery({
    queryKey: ['proposal', studentId, proposalId],
    queryFn: () => getProposal(studentId, proposalId),
    retry: false,
    refetchOnWindowFocus: false
  });
};


/* ********** END OF PROPOSAL MANAGEMENT ********** */  