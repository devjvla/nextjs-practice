import { z } from "zod";

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string().min(6)
});

export default schema;