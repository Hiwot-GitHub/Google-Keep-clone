import { z } from "zod"

const schema = z.object({
    content: z.string().min(1),

});

export default schema