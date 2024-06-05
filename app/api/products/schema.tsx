import { z } from "zod";

const schema = z.object({
    name: z.string().min(3),
    cost: z.number().min(1),
    quantity: z.number()
});

export default schema;