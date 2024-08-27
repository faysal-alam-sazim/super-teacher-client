import React from "react";

import { Box, Group, PasswordInput, SimpleGrid, Text, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";


import SubmitButton from "@/shared/components/SubmitButton";

import useLoginFormData from "../hooks/useLoginFormData";
import { loginFormSchemaResolver } from "./LoginForm.schema";
import { TLoginFormData } from "./LoginForm.types";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    mode: "onSubmit",
    resolver: loginFormSchemaResolver,
  });

  const { onSubmit, isSubmitting } = useLoginFormData();

  return (
    <>
      <Text my={20} fw={700} tt="uppercase" c="green" size="xl">
        Login
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid w={300}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  required
                  size="md"
                  error={errors.email?.message}
                  styles={{ label: { color: "green" } }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Password"
                  placeholder="Enter your password"
                  required
                  size="md"
                  error={errors.password?.message}
                  disabled={isSubmitting}
                  styles={{ label: { color: "green" } }}
                />
              )}
            />
          </SimpleGrid>
          <Group my="md" pt="md" display={"flex"} style={{ justifyContent: "center" }}>
            <SubmitButton />
          </Group>
        </form>
      </Box>
    </>
  );
};

export default LoginForm;
