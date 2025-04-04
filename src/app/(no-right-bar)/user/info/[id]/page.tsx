import Answers from "@/components/Answers";
import QuestionCard from "@/components/cards/QuestionCard";
import QuestionAnswerSelector from "@/components/QuestionAnswerSelector";
import LoadMore from "@/components/Reusable/LoadMore";
import { routes } from "@/constants/routes";
import { db } from "@/lib/primsadb";
import { User } from "@prisma/client";
import { Link2Icon } from "@radix-ui/react-icons";
import { Calendar, MapPinCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = async ({
  searchParams,
  params,
}: {
  searchParams: { tab: string; index: string };
  params: { id: string };
}) => {
  const { id } = params;
  const activeTab = searchParams?.tab || "questions";
  const index = Number(searchParams?.index) || 3;
  let datalength;
  const user: User | null = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  const questions = await db.question.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      answers: true,
      author: true,
    },
  });
  const answers = await db.answer.findMany({
    where: {
      authorId: user?.id,
    },
  });

  return (
    <>
      {/* header */}
      <div className="flex gap-3 flex-1">
        <Image
          src={user?.image || "/images/person-placeholder.jpeg"}
          alt="user-image"
          height={150}
          width={150}
          className="rounded-full object-cover  h-[140px] w-[140px] aspect-square"
        />
        <div className="w-full mt-2">
          <div className="flex max-sm:flex-col gap-2  sm:flex-between w-full">
            <h1 className="h1-bold">{user?.name}</h1>
            <Link
              href={`/user/${user?.id}`}
              className="dark:bg-dark-400 bg-light-700 my-3 paragraph-semibold flex-center rounded-lg w-[173px] h-[45px]"
            >
              Edit Profile
            </Link>
          </div>
          <p className=" paragraph-regular dark:text-light-800">
            {user?.email}
          </p>
          <div className="flex flex-wrap gap-[20px]">
            <div className="flex-center gap-2 mt-[20px]">
              <Link2Icon className="w-4 h-4 dark:text-light-500" />
              <Link
                href={user?.portfolio || routes.edit_user(user?.id || "")}
                className="paragraph-medium dark:text-blue-400 text-blue-500"
              >
                {user?.portfolio ? user.portfolio : "add a link"}
              </Link>
            </div>
            <div className="flex-center gap-2 mt-[20px]">
              <MapPinCheck className="w-4 h-4 dark:text-light-500" />
              <p className="paragraph-medium dark:text-light-700 text-dark-200">
                {user?.location ? user.location : "add a location"}
              </p>
            </div>
            <div className="flex-center gap-2 mt-[20px]">
              <Calendar className="w-4 h-4 dark:text-light-500" />
              <p className="paragraph-medium dark:text-light-700 text-dark-200">
                Joined <span>{user?.createdAt.toDateString()}</span>
              </p>
            </div>
          </div>
          <p className="mt-[10px] paragraph-regular dark:text-light-700">
            {user?.bio}
          </p>
        </div>
      </div>
      {/* stats */}
      <div className="mt-[40px]">
        <h1 className="h3-semibold">Stats</h1>
        <div className="mt-[21px]">
          <div className="flex-center rounded-lg w-[257px] h-[90px] gap-[40px] dark:bg-dark-300 bg-light-800">
            <div>
              <p className="body-semibold">{questions.length}</p>
              <p className="body-regular">Questions</p>
            </div>
            <div>
              <p className="body-semibold">{answers.length}</p>
              <p className="body-regular">Answers</p>
            </div>
          </div>
        </div>
      </div>
      {/* Questions and Answers selector*/}
      <QuestionAnswerSelector />

      {activeTab == "questions" ? (
        <div className="space-y-10">
          {questions.slice(0, index).map((ques, i) => {
            datalength = questions.length;
            return <QuestionCard question={ques} key={i} />;
          })}
        </div>
      ) : (
        <div className="space-y-10">
          {answers.slice(0, index).map((ans, i) => {
            datalength = answers.length;
            return <Answers answer={ans} key={i} />;
          })}
        </div>
      )}
      <LoadMore datalength={datalength || 0} />
    </>
  );
};

export default page;
