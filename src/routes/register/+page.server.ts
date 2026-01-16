import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "../$types";
import { FE_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (session) {
        redirect(303, '/home')
    }

    return { url: url.origin }
}

export const actions: Actions = {
    default: async (event) => {
        const {
            url,
            request,
            locals: { supabase }
        } = event

        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const validEmail =  /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

        if (!email || email === '') {
            return fail(400, { errors: { email: "Email must not be empty" } })
        }

        if (!password || password === '') {
            return fail(400, { errors: { password: "Password must not be empty" } })
        }

        if (!validEmail) {
            return fail(400, { errors: { email: "Please enter valid email address" }, email })
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${FE_URL}/home`
            }
        })

        if (error) {
            return fail(400, {
                success: false,
                email,
                message: `User register failed`
            })
        }

        return {
            success: true,
            message: 'User register success! Please check your email for confirmation.'
        }
    }
}