import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EVENTS, EVENT_LIST, type EventId } from "@/content/events";
import EventDetailPage from "@/components/EventDetailPage";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return EVENT_LIST.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS[id as EventId];
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.name} — Official Arena | AUTOMATE × QUANT '26`,
    description: event.description,
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = EVENTS[id as EventId];

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} allEvents={EVENT_LIST} />;
}

