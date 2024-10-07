import { Button, Flex, Grid, MultiSelect, Select, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

import { SUBJECTS } from "@/modules/Register/components/TeacherRegistrationForm/TeacherRegistrationForm.constants";
import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

import useUpdateTeacherForm from "./EditTeacherProfile.hooks";
import { editTeacherProfileSchemaResolver } from "./EditTeacherProfile.schema";
import { useEditTeacherProfileStyles } from "./EditTeacherProfile.styles";
import { TEditTeacherFormData, TEditTeacherProfileProps } from "./EditTeacherProfile.types";

const EditTeacherProfile = ({ userProfile, toggleEditProfileOpened }: TEditTeacherProfileProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TEditTeacherFormData>({
    resolver: editTeacherProfileSchemaResolver,
    mode: "onSubmit",
  });

  const { classes } = useEditTeacherProfileStyles();
  const { onSubmit, isLoading } = useUpdateTeacherForm();

  const handleOnSubmit = (data: TEditTeacherFormData) => {
    onSubmit(data);
    toggleEditProfileOpened();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid>
          <Grid.Col md={6}>
            <Controller
              name="email"
              defaultValue={userProfile?.email}
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
              defaultValue={userProfile?.firstName}
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
              name="majorSubject"
              defaultValue={userProfile?.teacher?.majorSubject}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Major Subject"
                  placeholder="Enter your field of specialization"
                  error={errors.majorSubject?.message}
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <Controller
              name="gender"
              defaultValue={userProfile?.gender}
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
              defaultValue={userProfile?.lastName}
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
              name="highestEducationLevel"
              defaultValue={userProfile?.teacher?.highestEducationLevel}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Highest Education Level"
                  placeholder="Select education level"
                  error={errors.highestEducationLevel?.message}
                  data={[
                    EHighestEducationLevel.BACHELORS,
                    EHighestEducationLevel.MASTERS,
                    EHighestEducationLevel.DIPLOMA,
                    EHighestEducationLevel.PHD,
                  ]}
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Controller
              name="subjectsToTeach"
              defaultValue={userProfile?.teacher?.subjectsToTeach}
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  label="Subjects to Teach"
                  placeholder="Select subjects"
                  error={errors.subjectsToTeach?.message}
                  data={SUBJECTS}
                  className={classes.input}
                  withAsterisk
                />
              )}
            />
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

export default EditTeacherProfile;
