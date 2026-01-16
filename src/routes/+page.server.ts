// import { supabase } from "$lib/supabaseClient";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (session) {
        redirect(303, '/home')
    }

    return { url: url.origin }
}

export const actions: Actions = {
    login: async (event) => {
        const {
            url,
            request,
            locals: { supabase }
        } = event

        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const validEmail =  /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)

        if (!validEmail) {
            return fail(400, { errors: { email: "Please enter valid email address" }, email })
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            return fail(400, {
                success: false,
                email,
                message: `Invalid credentials`
            })
        }

        return {
            success: true,
            message: 'Sign in success!'
        }
    }
}

