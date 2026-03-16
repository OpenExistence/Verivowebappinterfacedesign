import { 
  Shield, 
  CheckCircle, 
  Eye, 
  ExternalLink, 
  FileCheck,
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  Link as LinkIcon,
  Search
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { useNavigate, useParams } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function ElectionTransparency() {
  const navigate = useNavigate();
  const { electionId } = useParams();

  const election = {
    id: electionId,
    name: "Élection du Bureau Fédéral 2026",
    description: "Élection des membres du Bureau Fédéral pour le mandat 2026-2030",
    status: "active",
    contractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb2",
    totalVoters: 145,
    votesCount: 98,
    startDate: "2026-03-10T09:00:00",
    endDate: "2026-03-20T18:00:00",
  };

  const participationData = [
    { date: "10 Mar", votes: 12 },
    { date: "11 Mar", votes: 25 },
    { date: "12 Mar", votes: 38 },
    { date: "13 Mar", votes: 52 },
    { date: "14 Mar", votes: 67 },
    { date: "15 Mar", votes: 82 },
    { date: "16 Mar", votes: 98 },
  ];

  const distributionData = [
    { name: "Marie Dupont", value: 42, color: "#3b82f6" },
    { name: "Jean Martin", value: 35, color: "#8b5cf6" },
    { name: "Sophie Bernard", value: 21, color: "#10b981" },
  ];

  const transactions = [
    {
      hash: "0x7a9f...3c2d",
      type: "Vote",
      timestamp: "2026-03-16 14:32:15",
      block: "19234567",
      status: "confirmed",
    },
    {
      hash: "0x4b1e...8f9a",
      type: "Vote",
      timestamp: "2026-03-16 14:28:42",
      block: "19234561",
      status: "confirmed",
    },
    {
      hash: "0x9c3a...7d2b",
      type: "Vote",
      timestamp: "2026-03-16 14:15:08",
      block: "19234549",
      status: "confirmed",
    },
    {
      hash: "0x2f5d...6a1c",
      type: "Vote",
      timestamp: "2026-03-16 13:58:23",
      block: "19234532",
      status: "confirmed",
    },
    {
      hash: "0x8e4c...9b3f",
      type: "Vote",
      timestamp: "2026-03-16 13:42:56",
      block: "19234518",
      status: "confirmed",
    },
  ];

  const proofs = [
    {
      type: "Zero Knowledge Proof",
      description: "Preuve d'anonymat des votes",
      status: "Validée",
      hash: "0xzkp...7f3e",
    },
    {
      type: "Merkle Tree",
      description: "Intégrité de la liste des votants",
      status: "Validée",
      hash: "0xmt...4a2d",
    },
    {
      type: "Smart Contract Audit",
      description: "Vérification du code du contrat",
      status: "Validée",
      hash: "0xaud...9c1b",
    },
  ];

  const timeline = [
    { date: "10 Mar 09:00", event: "Ouverture du scrutin", type: "start" },
    { date: "10 Mar 09:15", event: "Premier vote enregistré", type: "vote" },
    { date: "12 Mar 12:00", event: "50% de participation atteints", type: "milestone" },
    { date: "15 Mar 15:30", event: "Déploiement preuve ZKP", type: "proof" },
    { date: "16 Mar (maintenant)", event: "67.6% de participation", type: "current" },
    { date: "20 Mar 18:00", event: "Clôture prévue du scrutin", type: "end" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Transparence du scrutin</h1>
                  <p className="text-sm text-gray-500">Vérification publique de l'intégrité</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate(`/vote/${electionId}`)}
              >
                Voter
              </Button>
              <Button 
                className="gap-2"
                onClick={() => navigate(`/results/${electionId}`)}
              >
                <Eye className="w-4 h-4" />
                Voir les résultats
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Informations principales */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{election.name}</h2>
              <p className="text-gray-600">{election.description}</p>
            </div>
            <Badge className="bg-green-600">
              <Clock className="w-3 h-3 mr-1" />
              En cours
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Smart Contract:</span>
              <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono">
                {election.contractAddress}
              </code>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => window.open(`https://etherscan.io/address/${election.contractAddress}`, "_blank")}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Taux de participation</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">67.6%</p>
            <p className="text-sm text-green-600 mt-1">+12.3% vs moyenne</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Votes enregistrés</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{election.votesCount}</p>
            <p className="text-sm text-gray-500 mt-1">sur {election.totalVoters} votants</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Preuves validées</p>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{proofs.length}</p>
            <p className="text-sm text-green-600 mt-1">100% vérifiées</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Transactions</p>
              <FileCheck className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{transactions.length}</p>
            <p className="text-sm text-gray-500 mt-1">Dernière: il y a 5 min</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Graphique de participation */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution de la participation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="votes" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribution des votes (graphique) */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution actuelle</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Preuves cryptographiques */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Preuves cryptographiques</h3>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Toutes validées
            </Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {proofs.map((proof) => (
              <div key={proof.type} className="border rounded-lg p-4 bg-green-50/30 border-green-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{proof.type}</h4>
                    <p className="text-xs text-gray-600">{proof.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {proof.status}
                  </Badge>
                  <code className="text-xs text-gray-500 font-mono">{proof.hash}</code>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Liste des transactions */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Transactions blockchain</h3>
              <Button variant="ghost" size="sm">Voir tout</Button>
            </div>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.hash} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{tx.type}</Badge>
                      <code className="text-xs text-blue-600 font-mono">{tx.hash}</code>
                    </div>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {tx.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{tx.timestamp}</span>
                    <span>Block #{tx.block}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline des événements</h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === "current" ? "bg-blue-600" :
                      event.type === "end" ? "bg-gray-300" :
                      "bg-green-600"
                    }`} />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm font-medium ${
                      event.type === "current" ? "text-blue-900" :
                      event.type === "end" ? "text-gray-500" :
                      "text-gray-900"
                    }`}>
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Vérification de vote */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vérifier votre vote
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Entrez le hash de votre transaction pour vérifier que votre vote a été correctement enregistré
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="0x..." 
                  className="max-w-md font-mono text-sm"
                />
                <Button className="gap-2">
                  <Search className="w-4 h-4" />
                  Vérifier
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges de vérification */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Smart Contract vérifié</h4>
            <p className="text-xs text-gray-600">Code audité et certifié</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Zero Knowledge Proof</h4>
            <p className="text-xs text-gray-600">Anonymat garanti</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Blockchain publique</h4>
            <p className="text-xs text-gray-600">Ethereum Mainnet</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Audit public</h4>
            <p className="text-xs text-gray-600">Transparence totale</p>
          </Card>
        </div>
      </div>
    </div>
  );
}