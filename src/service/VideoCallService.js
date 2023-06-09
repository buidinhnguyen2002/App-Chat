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

export const getRoom = async ( meetingId) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms/${meetingId}`, {
        method: "GET",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log(data);
    return data;
};
export const deactivateRoom = async ( meetingId) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms/deactivate`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"roomId" : meetingId}),
    });
    const data = await res.json();
    console.log(data);
};
export const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({token: authToken}): id;
    return meetingId.toString();
}
