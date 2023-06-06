export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ODA0NzQwYy1jYmU3LTQzMjUtYjMzMy0yMjVjNTM2YmYwYzAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4NTUyOTI2MSwiZXhwIjoxNzE3MDY1MjYxfQ.xTn3uY9kpVrpN_NprkM9fYSnxgoB9pk9ALW-hfv9y5c";
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    const { roomId } = await res.json();
    return roomId;
};