import { z } from "zod"

const schema = z.object({
    name: z.string().min(1).optional(),
    noteId: z.number(),
    labelId: z.number().optional()

}).refine(data => {
    return (data.name !== undefined) !== (data.labelId !== undefined);
},{message: "Either name or labelId is required!"});

export default schema