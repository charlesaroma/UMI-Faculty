import { useQuery } from '@tanstack/react-query';
import { getFacultyProfile } from './api.js';

export const useGetFacultyProfile = () => {
  return useQuery({
    queryKey: ['facultyProfile'],
    queryFn: getFacultyProfile,
    retry: false,
    refetchOnWindowFocus: false
  });
};
