'use client';
import { Claim } from '@/types';
import { DataSource, DataSourceCache } from '@toolpad/core/Crud';
import { z } from 'zod';


const API_URL = '/api/claims';

export const claimsDataSource: DataSource<Claim> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'claimNumber', headerName: 'Number', width: 140, hideable: true },
    { field: 'type', headerName: 'Type' },
    {
      field: 'incidentDate',
      headerName: 'Incident date',
      type: 'date',
      valueGetter: (value: string) => value && new Date(value),
      width: 140,
    },
    {
      field: 'incidentLocation',
      headerName: 'Location',
    },
    {
      field: 'reportedDate',
      headerName: 'Reported date',
      type: 'date',
      valueGetter: (value: string) => value && new Date(value),
      width: 140,
    },
    { field: 'description', headerName: 'Description' },
  ],
  getMany: async ({ paginationModel, filterModel, sortModel }) => {
    const queryParams = new URLSearchParams();

    queryParams.append('page', paginationModel.page.toString());
    queryParams.append('pageSize', paginationModel.pageSize.toString());
    if (sortModel?.length) {
      queryParams.append('sort', JSON.stringify(sortModel));
    }
    if (filterModel?.items?.length) {
      queryParams.append('filter', JSON.stringify(filterModel.items));
    }

    const res = await fetch(`${API_URL}?${queryParams.toString()}`, {
      method: 'GET',
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  getOne: async (employeeId) => {
    const res = await fetch(`${API_URL}/${employeeId}`);
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  createOne: async (data) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  updateOne: async (employeeId, data) => {
    const res = await fetch(`${API_URL}/${employeeId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  deleteOne: async (employeeId) => {
    const res = await fetch(`${API_URL}/${employeeId}`, { method: 'DELETE' });
    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.error);
    }
    return resJson;
  },
  validate: z.object({
    name: z.string({ required_error: 'Name is required' }).nonempty('Name is required'),
    age: z.number({ required_error: 'Age is required' }).min(18, 'Age must be at least 18'),
    joinDate: z
      .string({ required_error: 'Join date is required' })
      .nonempty('Join date is required'),
    role: z.enum(['Market', 'Finance', 'Development'], {
      errorMap: () => ({ message: 'Role must be "Market", "Finance" or "Development"' }),
    }),
  })['~standard'].validate,
};

export const claimsCache = new DataSourceCache();
