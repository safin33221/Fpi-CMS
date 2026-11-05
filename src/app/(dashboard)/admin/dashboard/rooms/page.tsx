import RoomManagement from "@/components/module/admin/room/RoomManagement";
import { getAllRooms } from "@/services/room/getAllRooms";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
    const rooms = await getAllRooms();

    return <RoomManagement rooms={rooms} />;
}

