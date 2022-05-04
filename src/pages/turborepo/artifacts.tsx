import { Card, Spinner } from "@geist-ui/core";
import useSWR from "swr";
import prettyBytes from "pretty-bytes";
import { Layout } from "../../components/Layout";
import { Artifact } from "../../types";

const Artifacts = () => {
  const { data, error } = useSWR<{ artifacts: readonly Artifact[] }>(
    "/api/artifacts"
  );

  return (
    <div className="flex flex-col">
      <div className="text-[40px] inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 ">
        Artifacts
      </div>
      <div className="mt-[64px]"></div>
      {!data && !error ? (
        <Spinner />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <div className="space-y-4">
          {data!.artifacts.map((artifact) => (
            <Card key={artifact.hash} shadow>
              <h4 className="font-semibold text-lg mb-4">{artifact.hash}</h4>
              <p>Size: {prettyBytes(artifact.size)}</p>
              <p>Created at: {artifact.createdAt}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

Artifacts.getLayout = Layout;

export default Artifacts;
