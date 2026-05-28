import { redirect } from "next/navigation";

export default async function RecruitmentLegacyRedirect({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    redirect(`/${id}`);
}
