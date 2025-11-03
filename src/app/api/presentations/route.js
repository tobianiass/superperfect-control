import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "@/utils/mongodb";
import Presentation from "@/models/Presentation";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { presentationId, embedUrl } = await request.json();
    
    await connectMongoDB();
    
    // Find user by session email
    const User = (await import("@/models/User")).default;
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if presentation already exists for this user
    const existing = await Presentation.findOne({ 
      userId: user._id, 
      presentationId 
    });

    if (existing) {
      existing.lastViewed = new Date();
      await existing.save();
      return NextResponse.json({ presentation: existing }, { status: 200 });
    }

    // Create new presentation
    const presentation = await Presentation.create({
      userId: user._id,
      presentationId,
      embedUrl,
      title: `Presentation ${presentationId.slice(0, 16)}`
    });

    return NextResponse.json({ presentation }, { status: 201 });

  } catch (error) {
    console.error("Error saving presentation:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const User = (await import("@/models/User")).default;
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ presentations: [] }, { status: 200 });
    }

    const presentations = await Presentation.find({ userId: user._id })
      .sort({ lastViewed: -1 })
      .limit(10);

    return NextResponse.json({ presentations }, { status: 200 });

  } catch (error) {
    console.error("Error fetching presentations:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}