import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const chatRouter = createTRPCRouter({
  getChatHistory: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.currentUserId;

    const chatHistory = await ctx.prisma.chat.findMany({
      where: {
        userId,
      },
    });

    return chatHistory;
  }),
  create: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        message: z.string(),
        response: z.string(),
        sessionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUserId;
      const { message, response, sessionId } = input;
      const chat = await ctx.prisma.chat.create({
        data: {
          userId,
          message,
          response,
          sessionId,
        },
      });

      return chat;
    }),
});
