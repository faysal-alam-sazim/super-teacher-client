import React from "react";

import { Box, Button, Flex, PasswordInput, Select, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import SubmitButton from "@/shared/components/SubmitButton";
import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

import useStudentRegistration from "../../hooks/useStudentRegistration";
import { CLASS_COLLEGE, CLASS_SCHOOL } from "./StudentRegistrationForm.constants";
import classes from "./StudentRegistrationForm.module.css";
import { studentRegistrationSchemaResolver } from "./StudentRegistrationForm.schema";
import { TStudentRegistrationFormData } from "./StudentRegistrationForm.types";

const StudentRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TStudentRegistrationFormData>({
    resolver: studentRegistrationSchemaResolver,
    mode: "onChange",
  });

  const { onSubmit } = useStudentRegistration();
  const educationLevel = watch("educationLevel");

  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"}>
      <Box className={classes["form-container"]}>
        <Title className={classes["title"]}>Register as a Student</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={10}>
            <Box className={classes["input-flex"]}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="First Name"
                    placeholder="Enter your first name"
                    error={errors.firstName?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Last Name"
                    placeholder="Enter your last name"
                    error={errors.lastName?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gender"
                    data={[EGender.MALE, EGender.FEMALE]}
                    placeholder="Select your gender"
                    error={errors.gender?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            </Box>
            <Box className={classes["input-flex"]}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Address"
                    placeholder="Enter your address"
                    error={errors.address?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            </Box>
            <Box className={classes["input-flex"]}>
              <Controller
                name="educationLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Education Level"
                    data={[
                      EEducationLevel.SCHOOL,
                      EEducationLevel.COLLEGE,
                      EEducationLevel.UNIVERSITY,
                    ]}
                    placeholder="Select your education level"
                    error={errors.educationLevel?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              {educationLevel === EEducationLevel.SCHOOL ||
              educationLevel === EEducationLevel.COLLEGE ? (
                <Controller
                  name="medium"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Bangla/English Medium"
                      error={errors.medium?.message}
                      required
                      data={[EMedium.BANGLA, EMedium.ENGLISH]}
                      placeholder="Select medium"
                      className={classes["variable-form-width"]}
                      styles={{ label: { color: "green" } }}
                    />
                  )}
                />
              ) : educationLevel === EEducationLevel.UNIVERSITY ? (
                <Controller
                  name="degree"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Bachelors/Masters"
                      error={errors.degree?.message}
                      required
                      data={[EDegree.BACHELORS, EDegree.MASTERS]}
                      placeholder="Select degree"
                      className={classes["variable-form-width"]}
                      styles={{ label: { color: "green" } }}
                    />
                  )}
                />
              ) : null}
            </Box>

            {educationLevel === EEducationLevel.SCHOOL ||
            educationLevel === EEducationLevel.COLLEGE ? (
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Class"
                    error={errors.class?.message}
                    required
                    data={educationLevel === EEducationLevel.SCHOOL ? CLASS_SCHOOL : CLASS_COLLEGE}
                    placeholder="Select class"
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            ) : null}

            {educationLevel === EEducationLevel.UNIVERSITY ? (
              <>
                <Controller
                  name="degreeName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Degree Name"
                      error={errors.degreeName?.message}
                      required
                      data={[
                        "Bachelor of Science",
                        "Bachelor of Arts",
                        "Bachelor in Business Administration",
                      ]}
                      placeholder="Select your degree"
                      styles={{ label: { color: "green" } }}
                    />
                  )}
                />
                <Controller
                  name="semesterYear"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label="Semester/Year"
                      error={errors.semesterYear?.message}
                      required
                      placeholder="Enter your semester year"
                      styles={{ label: { color: "green" } }}
                    />
                  )}
                />
              </>
            ) : null}

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Email"
                  error={errors.email?.message}
                  required
                  placeholder="Enter your email"
                  styles={{ label: { color: "green" } }}
                />
              )}
            />

            <Box className={classes["input-flex"]}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    label="Confirm Password"
                    placeholder="Confirm password"
                    error={errors.confirmPassword?.message}
                    required
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            </Box>
          </Flex>
          <Flex justify={"space-around"} align={"center"} my={24}>
            <Button bg={"#640D6B"} type="reset">
              Reset
            </Button>
            <SubmitButton />
          </Flex>
          <Box sx={{ fontSize: "14px" }}>
            <Text ta={"center"} color="green">
              Already have an account? <span style={{ color: "white" }}>Login</span>
            </Text>
            <Text ta={"center"}>Register</Text>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default StudentRegistrationForm;
