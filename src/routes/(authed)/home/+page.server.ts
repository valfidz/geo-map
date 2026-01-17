import { fail, redirect, json } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "../../$types";
import { GEO_API } from "$env/static/private";

export const load: PageServerLoad = async () => {
    const dataMap = await fetch(`${GEO_API}`)

    if (!dataMap) {
        return fail(500, {
            status: 'failed',
            message: 'Something is wrong with geojson API'
        })
    }

    const responseBody = await dataMap.json();

    // console.log("response body", responseBody)
    // console.log("response body length", responseBody.features.length)
    // console.log("response body example", responseBody.features[0].properties.name)

    return {
        dataMap: responseBody
    }
}

export const actions: Actions = {
    logout: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession()

        if (session) {
            await supabase.auth.signOut()

            redirect(303, '/')
        }
    }
}