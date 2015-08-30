require "rake"
require "open-uri"
require "json"

ROOT_DIR = File.dirname __FILE__

desc "Generates the list of top pods used in the share widget"
task :top_pod_list, :number_of_pods do |task, args|
  number_of_pods = args.number_of_pods ? args.number_of_pods.to_i : 8

  pods = JSON.load(open("http://the-federation.info/pods.json"))["pods"]
  pods.sort_by! {|pod| pod["active_users_halfyear"]}.reverse!

  pods.map! do |pod|
    {
      name: pod["name"].downcase == "diaspora*" ? pod["host"] : pod["name"],
      url: "https://#{pod["host"]}/"
    }
  end

  File.write "#{ROOT_DIR}/_data/pods.json", JSON.pretty_generate(pods[0..number_of_pods-1])
end
