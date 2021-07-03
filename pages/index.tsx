import React, { useState, useEffect } from 'react';
import Head from 'next/head'

import Header from '../components/Header';
import EmployeesTable from '../components/EmployeesTable';
import EmployeeForm from '../components/EmployeeForm';

import { Employee } from '../types/types';

export default function Home() {
  // Data state.
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesDisplay, setEmployeesDisplay] = useState<Employee[]>([]);

  // Search Field state.
  const [search, setSearch] = useState<string>('');

  // Create/Update form state.
  const [newEmployeeDialogOpen, setNewEmployeeDialogOpen] = useState<Boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const initialEmployees = () => JSON.parse(window.localStorage.getItem('employees') ?? '[]');
    setEmployees(initialEmployees());
    setEmployeesDisplay(initialEmployees());
  }, []);

  const updateEmployeesPersistent = () => {
    window.localStorage.setItem('employees', JSON.stringify(employees));
  };

  useEffect(() => {
    updateEmployeesPersistent();
    setEmployeesDisplay(JSON.parse(JSON.stringify(employees)));
    filterEmployees();
  },
    [employees],
  );

  const filterEmployees = () => {
    if (search == '') return;
    let employeesCopy = JSON.parse(JSON.stringify(employees));
    console.log('employeesCopy',employeesCopy);
    const newEmployees: Employee[] = JSON.parse(JSON.stringify(employees)).filter((employee, id) => {
      return `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.toLowerCase());
    });
    setEmployeesDisplay(newEmployees);
  };

  const resetFilter = () => {
    setSearch('');
    const initialEmployees = () => JSON.parse(window.localStorage.getItem('employees') ?? '[]');
    setEmployeesDisplay(initialEmployees());
  };

  const addEmployee = (employee: Employee) => {
    setIsUpdate(false);
    setEmployees((prevEmployees: Employee[]) => [...JSON.parse(JSON.stringify(prevEmployees)), employee]);
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees((prevEmployees: Employee[]) => {
      const newEmployees: Employee[] = [...prevEmployees];
      newEmployees[id] = employee;
      return newEmployees;
    });
  };

  const removeEmployee = (id: number) => {
    setEmployees((prevEmployees: Employee[]) => {
      let newEmployees: Employee[] = [...prevEmployees];
      newEmployees.splice(id, 1);
      return newEmployees;
    });
  };

  const handleDeleteAllEmployees = () => {
    setEmployees([]);
  };

  const openUpdateForm = (id: number, employee: Employee) => {
    setIsUpdate(true);
    handleNewEmployeeDialogOpen(id, employee);
  };


  const handleNewEmployeeDialogOpen = (id = null, employee: Employee = null) => {
    if (id === null || employee == null) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
      setId(id);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
    }
    setNewEmployeeDialogOpen(true);
  };

  const handleNewEmployeeDialogClose = () => {
    setNewEmployeeDialogOpen(false);
  };

  const handleSearchChange = e => { setSearch(e.target.value); };

  const handleFirstNameChange = e => { setFirstName(e.target.value); };
  const handleLastNameChange = e => { setLastName(e.target.value); };
  const handleEmailChange = e => { setEmail(e.target.value); };

  const cleanFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  }

  return (
    <>
      <Head>
        <title>Employee Mockup WebDemo</title>
      </Head>
      <Header
        newEmployeeDialogOpen={newEmployeeDialogOpen}
        handleDeleteAllEmployees={handleDeleteAllEmployees}
        handleNewEmployeeDialogOpen={handleNewEmployeeDialogOpen}
        handleNewEmployeeDialogClose={handleNewEmployeeDialogClose}
        search={search}
        handleSearchChange={handleSearchChange}
        filterEmployees={filterEmployees}
        resetFilter={resetFilter}
      />
      <EmployeesTable
        employees={employeesDisplay}
        handleNewEmployeeDialogOpen={handleNewEmployeeDialogOpen}
        handleNewEmployeeDialogClose={handleNewEmployeeDialogClose}
        removeEmployee={removeEmployee}
        openUpdateForm={openUpdateForm}
      />
      <EmployeeForm
        isUpdate={isUpdate}
        newEmployeeDialogOpen={newEmployeeDialogOpen}
        handleNewEmployeeDialogOpen={handleNewEmployeeDialogOpen}
        handleNewEmployeeDialogClose={handleNewEmployeeDialogClose}
        addEmployee={addEmployee}
        updateEmployee={updateEmployee}
        cleanFields={cleanFields}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleEmailChange={handleEmailChange}
        id={id}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    </>
  );
}
