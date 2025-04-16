'use client';
import { Claim, ClaimStatus } from '@/types';
import { DataSource, DataSourceCache } from '@toolpad/core/Crud';
import { z } from 'zod';


const API_URL = '/api/claims';

export const claimsDataSource: DataSource<Claim> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'type', headerName: 'Type' },
    { field: 'status', headerName: 'Status', type: 'singleSelect', editable: true, valueOptions: Object.values(ClaimStatus) },
    {
      field: 'incidentDate',
      headerName: 'Incident date',
      type: 'date',
      valueSetter: (value: string) => new Date(value),
      editable: false,
      valueGetter: (value: string) => new Date(value),
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
      editable: false,
      valueGetter: (value: string) => value && new Date(value),
      width: 140,
    },
    { field: 'description', headerName: 'Description', editable: true },
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
    console.log('updateOne', employeeId, data);
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
    type: z.string().min(1, { message: 'Type is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    incidentDate: z.date().optional(),
    incidentLocation: z.string().optional(),
  })['~standard'].validate,
};

export const claimsCache = new DataSourceCache();
