require "rake"
require "open-uri"
require "json"

ROOT_DIR = File.dirname __FILE__

desc "Generates the list of top pods used in the share widget"
task :top_pod_list, :number_of_pods do |task, args|
  number_of_pods = args.number_of_pods ? args.number_of_pods.to_i : 8

  pods = JSON.load(open(
    "https://the-federation.info/graphql?query=query%20Platform(%24name%3A%20String!)%20%7B%0A%20%20statsNodes(platform%3A%20%24name)%20%7B%0A%20%20%20%20node%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20host%0A%20%20%20%20%7D%0A%20%20%20%20usersHalfYear%0A%20%20%7D%0A%7D%0A&operationName=Platform&variables=%7B%22name%22%3A%22diaspora%22%7D",
    "content-type" => "application/graphql"
  ))["data"]["statsNodes"]

  pods.sort_by! {|pod| pod["usersHalfYear"] || 0}.reverse!
  pods.map! do |pod|
    {
      name: pod["node"]["name"].downcase == "diaspora*" ? pod["node"]["host"] : pod["node"]["name"],
      host: pod["node"]["host"]
    }
  end

  File.write "#{ROOT_DIR}/_data/pods.json", JSON.pretty_generate(pods[0..number_of_pods-1])
end
