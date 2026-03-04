import { getProjectService } from "@/src/core/infrastructure/config/project-dependency";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const projectService = await getProjectService();
    const projects = await projectService.getAllProjects({ page: 1, limit: 10 });

    if (!projects) {
      return NextResponse.json(
        { error: "Projects not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ projects });

  } catch (error) {

    console.log("Error to get projects", error);

    return NextResponse.json(
      { error: "Error to get projects" },
      { status: 500 }
    );
  }
}