import { unstable_cache } from 'next/cache'
import { eq, and } from 'drizzle-orm'

import { db } from '~/server/db'
import { signins } from '~/server/db/schema'

export const get_signed_in_ninjas = unstable_cache(
    async (
        center: 'northridge' | 'silverlake' | 'altadena',
        type: 'camp' | 'day_camp'
    ) => {
        const ninjas = await db.query.signins.findMany({
            where: and(
                eq(signins.checked_out, false),
                eq(signins.center, center),
                eq(signins.type, type)
            )
        })

        const formattedNinjas = ninjas.map((ninja) => ({
            id: ninja.id,
            ninja_name: ninja.ninja_name,
            time_in: ninja.time_in.toLocaleTimeString(['en-US'], {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Los_Angeles'
            }),
            phone_number: ninja.phone_number,
            dropoff_guardian: ninja.dropoff_guardian,
            pickup_guardian: ninja.pickup_guardian
        }))

        return formattedNinjas
    },
    ['ninjas'],
    { tags: ['ninjas'] }
)

export const get_ninjas = unstable_cache(
    async () => {
        const ninjas = await db.query.signins.findMany()

        const formattedNinjas = ninjas.map((ninja) => ({
            ninja_name: ninja.ninja_name,
            date: ninja.time_in.toLocaleDateString(['en-US'], {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'America/Los_Angeles'
            }),
            time_in: ninja.time_in.toLocaleTimeString(['en-US'], {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Los_Angeles'
            }),
            time_out: ninja.time_out?.toLocaleTimeString(['en-US'], {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Los_Angeles'
            }),
            dropoff_guardian: ninja.dropoff_guardian,
            pickup_guardian: ninja.pickup_guardian
        }))

        return formattedNinjas
    },
    ['ninjas'],
    { tags: ['ninjas'] }
)
