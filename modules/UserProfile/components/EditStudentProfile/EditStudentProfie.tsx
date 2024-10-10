import { useEffect } from "react";

import { Button, Flex, Grid, Select, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import {
  CLASS_COLLEGE,
  CLASS_SCHOOL,
} from "@/modules/Register/components/StudentRegistrationForm/StudentRegistrationForm.constants";
import { EDegree, EEducationLevel, EGender, EMedium } from "@/shared/typedefs";

import useUpdateStudentForm from "./EditStudentProfile.hooks";
import { editStudenProfileSchemaResolver } from "./EditStudentProfile.schema";
import { useEditStudentProfileStyles } from "./EditStudentProfile.styles";
import { TEditStudentProfileFormData, TEditStudentProfileProps } from "./EditStudentProfile.types";

const EditStudentProfie = ({ userProfile, toggleEditProfileOpenend }: TEditStudentProfileProps) => {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TEditStudentProfileFormData>({
    resolver: editStudenProfileSchemaResolver,
    mode: "onSubmit",
    defaultValues: {
      email: userProfile?.email,
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      gender: userProfile?.gender,
      address: userProfile?.student?.address,
      phoneNumber: userProfile?.student?.phoneNumber,
      educationLevel: userProfile?.student?.educationLevel,
      degree: userProfile?.student?.degree || "",
      medium: userProfile?.student?.medium || "",
      class: userProfile?.student?.class || "",
      degreeName: userProfile?.student?.degreeName || "",
      semesterYear: userProfile?.student?.semesterYear || "",
    },
  });

  const { classes } = useEditStudentProfileStyles();

  const educationLevel = watch("educationLevel");

  const { onSubmit, isLoading } = useUpdateStudentForm();

  useEffect(() => {
    if (educationLevel !== userProfile?.student?.educationLevel) {
      setValue("degree", "");
      setValue("medium", "");
      setValue("class", "");
      setValue("degreeName", "");
      setValue("semesterYear", "");
    } else {
      setValue("degree", userProfile?.student?.degree);
      setValue("medium", userProfile?.student?.medium);
      setValue("class", userProfile?.student?.class);
      setValue("degreeName", userProfile?.student?.degreeName);
      setValue("semesterYear", userProfile?.student?.semesterYear);
    }
  }, [educationLevel, userProfile, setValue]);

  const handleOnSubmit = (data: TEditStudentProfileFormData) => {
    onSubmit(data);

    if (!isLoading) {
      toggleEditProfileOpenend();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid>
          <Grid.Col md={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Email"
                  error={errors.email?.message}
                  placeholder="Enter your email"
                  className={classes.input}
                  disabled
                  readOnly
                  withAsterisk
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="First Name"
                  error={errors.firstName?.message}
                  placeholder="Enter your first name"
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Address"
                  placeholder="Enter your address"
                  error={errors.address?.message}
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
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
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
            {educationLevel === EEducationLevel.UNIVERSITY ? (
              <Controller
                name="degreeName"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Degree Name"
                    error={errors.degreeName?.message}
                    data={[
                      "Bachelor of Science",
                      "Bachelor of Arts",
                      "Bachelor in Business Administration",
                    ]}
                    placeholder="Select your degree"
                    className={classes.input}
                    withAsterisk
                  />
                )}
              />
            ) : null}
          </Grid.Col>
          <Grid.Col md={6}>
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
                  className={classes.input}
                  withAsterisk
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
                  className={classes.input}
                  withAsterisk
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
                  error={errors.address?.message}
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
            {educationLevel === EEducationLevel.UNIVERSITY ? (
              <Controller
                name="degree"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Bachelors/Masters"
                    error={errors.degree?.message}
                    data={[EDegree.BACHELORS, EDegree.MASTERS]}
                    placeholder="Select degree"
                    className={classes.input}
                    withAsterisk
                  />
                )}
              />
            ) : null}
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
                    data={[EMedium.BANGLA, EMedium.ENGLISH]}
                    placeholder="Select medium"
                    className={classes.input}
                    withAsterisk
                  />
                )}
              />
            ) : null}
            {educationLevel === EEducationLevel.UNIVERSITY ? (
              <Controller
                name="semesterYear"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label="Semester/Year"
                    error={errors.semesterYear?.message}
                    placeholder="Enter your semester year"
                    className={classes.input}
                    withAsterisk
                  />
                )}
              />
            ) : null}
          </Grid.Col>
          <Grid.Col span={12}>
            {educationLevel !== EEducationLevel.UNIVERSITY ? (
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Class"
                    error={errors.class?.message}
                    data={educationLevel === EEducationLevel.SCHOOL ? CLASS_SCHOOL : CLASS_COLLEGE}
                    placeholder="Select class"
                    className={classes.input}
                    withAsterisk
                  />
                )}
              />
            ) : null}
          </Grid.Col>
        </Grid>
        <Flex justify={"space-around"} align={"center"} my={24}>
          <Button bg={"#640D6B"} onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default EditStudentProfie;
