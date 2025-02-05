import View from "@/app/components/results/view";

export default function Page({ params }: { params: { id: string } }) {
  return <View id={params.id} />;
}
