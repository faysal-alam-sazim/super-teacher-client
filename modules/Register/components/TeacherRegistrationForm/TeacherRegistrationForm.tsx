import React from "react";

import {
  Box,
  Button,
  Flex,
  MultiSelect,
  PasswordInput,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import SubmitButton from "@/shared/components/SubmitButton";
import { TRootState } from "@/shared/redux/store";
import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

import useTeacherRegistration from "../../hooks/useTeacherRegistration";
import { SUBJECTS } from "./TeacherRegistrationForm.constants";
import classes from "./TeacherRegistrationForm.module.css";
import { teacherRegistrationSchemaResolver } from "./TeacherRegistrationForm.schema";
import { TTeacherRegistrationFormData } from "./TeacherRegistrationForm.types";

const TeacherRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TTeacherRegistrationFormData>({
    resolver: teacherRegistrationSchemaResolver,
    mode: "onChange",
  });

  const attemptCounter = useSelector((state: TRootState) => state.attemptCounter.counter);

  const { onSubmit } = useTeacherRegistration();

  return (
    <Flex justify={"center"} align={"center"} mih={"100vh"}>
      <Box className={classes["form-container"]}>
        <Title className={classes["title"]}>Register as a Teacher</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={10}>
            <Controller
              name="uniqueCode"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Enter registration code"
                  error={errors.uniqueCode?.message}
                  required
                  placeholder="Enter unique code, e.g. ceb486"
                  styles={{ label: { color: "green" } }}
                />
              )}
            />
            <Text size={"xs"} mb={6}>
              {attemptCounter > 0
                ? `Attemps remaining: ${attemptCounter}`
                : "No attempts remaining"}
            </Text>

            <Box className={classes["input-grid"]}>
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
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            </Box>
            <Box className={classes["input-grid"]}>
              <Controller
                name="majorSubject"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Major Subject"
                    placeholder="Enter your field of specialization"
                    error={errors.majorSubject?.message}
                    required
                    sx={{ gridColumn: "span 2" }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
              <Controller
                name="highestEducationLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Highest Education Level"
                    placeholder="Select education level"
                    error={errors.highestEducationLevel?.message}
                    required
                    data={[
                      EHighestEducationLevel.BACHELORS,
                      EHighestEducationLevel.MASTERS,
                      EHighestEducationLevel.DIPLOMA,
                      EHighestEducationLevel.PHD,
                    ]}
                    sx={{ flexGrow: 1 }}
                    styles={{ label: { color: "green" } }}
                  />
                )}
              />
            </Box>
            <Controller
              name="subjectsToTeach"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  label="Subjects to Teach"
                  placeholder="Select subjects"
                  error={errors.subjectsToTeach?.message}
                  required
                  data={SUBJECTS}
                  sx={{ flexGrow: 1 }}
                  styles={{ label: { color: "green" } }}
                />
              )}
            />

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
  );
};

export default TeacherRegistrationForm;
