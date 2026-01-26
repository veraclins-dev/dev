import { db } from '../app/utils/db/db.server'

async function seed() {
	console.log('🌱 Seeding database...')

	await db.$transaction(async (tx) => {
		await tx.role.createMany({
			data: [
				{
					id: 'role-member',
					name: 'member',
					description: 'Standard user role',
					level: 1,
				},
				{
					id: 'role-moderator',
					name: 'moderator',
					description: 'Moderator role',
					level: 2,
				},
				{
					id: 'role-admin',
					name: 'admin',
					description: 'Administrator role',
					level: 3,
				},
			],
			skipDuplicates: true,
		})

		console.log('✅ Seeded roles')
	})

	console.log('✅ Database seeded successfully')
}

seed()
	.catch((e) => {
		console.error('❌ Error seeding database:', e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
