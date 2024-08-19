import React from "react";

import { Box, Button, Flex, PasswordInput, Select, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import SubmitButton from "@/shared/components/SubmitButton";

import { onSubmit } from "../../hooks/StudentRegistrationForm.hooks";
import classes from "./StudentRegistrationForm.module.css";
import {
  studentRegistrationSchemaResolver,
  TStudentRegistrationFormData,
} from "./StudentRegistrationForm.schema";

const StudentRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TStudentRegistrationFormData>({
    resolver: studentRegistrationSchemaResolver,
    mode: "onChange",
  });
  const educationLevel = watch("educationLevel");

  return (
    <>
      <Flex justify={"center"} align={"center"} mih={"100vh"}>
        <Box className={classes["form-container"]}>
          <Title tt={"uppercase"} color="green" ta={"center"} mb={24}>
            Register as a Student
          </Title>
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
                      required
                      error={errors.firstName?.message}
                      sx={{ flexGrow: 1 }}
                      styles={{
                        label: { color: "green" },
                      }}
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
                      required
                      error={errors.lastName?.message}
                      sx={{ flexGrow: 1 }}
                      styles={{
                        label: { color: "green" },
                      }}
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
                      data={["Male", "Female"]}
                      placeholder="Select your gender"
                      required
                      error={errors.gender?.message}
                      sx={{ flexGrow: 1 }}
                      styles={{
                        label: { color: "green" },
                      }}
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
                      required
                      error={errors.address?.message}
                      sx={{ flexGrow: 1 }}
                      styles={{
                        label: { color: "green" },
                      }}
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
                      styles={{
                        label: { color: "green" },
                      }}
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
                      data={["School", "College", "University"]}
                      placeholder="Select your education level"
                      error={errors.educationLevel?.message}
                      required
                      sx={{ flexGrow: 1 }}
                      styles={{
                        label: { color: "green" },
                      }}
                    />
                  )}
                />
                {educationLevel === "School" || educationLevel === "College" ? (
                  <Controller
                    name="medium"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Bangla/English Medium"
                        required
                        data={["Bangla", "English"]}
                        placeholder="Select medium"
                        error={errors.medium?.message}
                        className={classes["variable-form-width"]}
                        styles={{
                          label: { color: "green" },
                        }}
                      />
                    )}
                  />
                ) : educationLevel === "University" ? (
                  <Controller
                    name="degree"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Bachelors/Masters"
                        required
                        data={["Bachelors", "Masters"]}
                        placeholder="Select degree"
                        error={errors.degree?.message}
                        className={classes["variable-form-width"]}
                        styles={{
                          label: { color: "green" },
                        }}
                      />
                    )}
                  />
                ) : null}
              </Box>

              {educationLevel === "School" || educationLevel === "College" ? (
                <Controller
                  name="class"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Class"
                      required
                      data={["1", "2", "3", "4", "5", "7", "8", "9", "10", "11", "12"]}
                      placeholder="Select class"
                      error={errors.class?.message}
                      styles={{
                        label: { color: "green" },
                      }}
                    />
                  )}
                />
              ) : null}

              {educationLevel === "University" ? (
                <>
                  <Controller
                    name="degreeName"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Degree Name"
                        required
                        data={[
                          "Bachelor of Science",
                          "Bachelor of Arts",
                          "Bachelor in Business Administration",
                        ]}
                        placeholder="Select your degree"
                        error={errors.degreeName?.message}
                        styles={{
                          label: { color: "green" },
                        }}
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
                        required
                        placeholder="Enter your semester year"
                        error={errors.semesterYear?.message}
                        styles={{
                          label: { color: "green" },
                        }}
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
                    required
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    styles={{
                      label: { color: "green" },
                    }}
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
                      required
                      error={errors.password?.message}
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
                      required
                      error={errors.confirmPassword?.message}
                      sx={{ flexGrow: 1 }}
                      styles={{ label: { color: "green" } }}
                    />
                  )}
                />
              </Box>
            </Flex>
            <Flex justify={"space-around"} align={"center"} my={24}>
              <Button bg={"#640D6B"} onClick={() => reset()}>
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
    </>
  );
};

export default StudentRegistrationForm;
