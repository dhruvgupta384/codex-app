"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword, verifyPassword, clearSession } from "@/lib/auth";

export interface AuthFormState {
  error?: string;
}

function required(value: FormDataEntryValue | null, label: string) {
  const text = value?.toString().trim();
  if (!text) {
    throw new Error(`${label} is required.`);
  }
  return text;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData,
) {
  let name = "";
  let agencyName = "";
  let email = "";
  let password = "";

  try {
    name = required(formData.get("name"), "Name");
    agencyName = required(formData.get("agencyName"), "Agency name");
    email = required(formData.get("email"), "Email").toLowerCase();
    password = required(formData.get("password"), "Password");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Please complete the form.",
    };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "An account already exists for that email." };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: agencyName,
      slug: `${slugify(agencyName)}-${user.id.slice(0, 6)}`,
      industryType: "Agency",
      timezone: "Asia/Calcutta",
      ownerUserId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "owner",
        },
      },
      templates: {
        createMany: {
          data: [
            {
              type: "quote",
              name: "Starter growth retainer",
              body: "3-month retainer with weekly reporting, KPI dashboard, and one strategy call per week.",
            },
            {
              type: "whatsapp_reply",
              name: "Warm first response",
              body: "Thanks for reaching out. I looked through your requirement and can share an approach plus rough budget today.",
            },
          ],
        },
      },
    },
  });

  await createSession(user.id);
  revalidatePath("/");
  redirect(`/onboarding?workspace=${workspace.id}`);
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
) {
  let email = "";
  let password = "";

  try {
    email = required(formData.get("email"), "Email").toLowerCase();
    password = required(formData.get("password"), "Password");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Email and password are required.",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/app/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}
