import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectMongoDB from "@/utils/mongodb";
import Presentation from "@/models/Presentation";
import User from "@/models/User";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { presentationId, embedUrl } = await request.json();
    if (!presentationId || !embedUrl) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    let pres = await Presentation.findOne({ userId: user._id, presentationId });
    if (pres) {
      pres.lastViewed = new Date();
      await pres.save();
      return NextResponse.json({ presentation: pres }, { status: 200 });
    }

    pres = await Presentation.create({
      userId: user._id,
      presentationId,
      embedUrl,
      title: `Presentation ${presentationId.slice(0, 8)}`
    });

    return NextResponse.json({ presentation: pres }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ presentations: [] }, { status: 200 });
    const presentations = await Presentation.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .limit(25);
    return NextResponse.json({ presentations }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}