import { 
  Shield, 
  Trophy, 
  Users, 
  TrendingUp, 
  ExternalLink,
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  Eye,
  BarChart3
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { Progress } from "../components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { toast } from "sonner";

export function ElectionResults() {
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
    zkpHash: "0xzkp...7f3e",
    blockchainLink: "https://etherscan.io/address/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb2",
  };

  const candidates = [
    {
      id: 1,
      name: "Marie Dupont",
      club: "FC Paris Sport",
      votes: 41,
      percentage: 41.8,
      photo: "👩‍💼",
      rank: 1,
    },
    {
      id: 2,
      name: "Jean Martin",
      club: "Olympique Lyon",
      votes: 34,
      percentage: 34.7,
      photo: "👨‍💼",
      rank: 2,
    },
    {
      id: 3,
      name: "Sophie Bernard",
      club: "AS Monaco",
      votes: 23,
      percentage: 23.5,
      photo: "👩‍💼",
      rank: 3,
    },
  ];

  const chartData = candidates.map(c => ({
    name: c.name.split(" ")[0],
    votes: c.votes,
    fullName: c.name,
  }));

  const colors = ["#3b82f6", "#8b5cf6", "#10b981"];

  const participationByClub = [
    { club: "FC Paris Sport", voters: 45, participated: 38, rate: 84.4 },
    { club: "Olympique Lyon", voters: 38, participated: 28, rate: 73.7 },
    { club: "AS Monaco", voters: 32, participated: 19, rate: 59.4 },
    { club: "RC Strasbourg", voters: 30, participated: 13, rate: 43.3 },
  ];

  const downloadResults = () => {
    toast.success("Rapport PDF généré avec succès");
  };

  const shareResults = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier");
    } catch (error) {
      // Fallback si l'API clipboard n'est pas disponible
      toast.info("Lien: " + window.location.href);
    }
  };

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
                onClick={() => navigate("/admin")}
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
                  <h1 className="text-xl font-bold text-gray-900">Résultats du scrutin</h1>
                  <p className="text-sm text-gray-500">Résultats vérifiables et transparents</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate(`/transparency/${electionId}`)}
              >
                <Eye className="w-4 h-4" />
                Transparence
              </Button>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={shareResults}
              >
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
              <Button 
                className="gap-2"
                onClick={downloadResults}
              >
                <Download className="w-4 h-4" />
                Télécharger le rapport
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
              <CheckCircle className="w-3 h-3 mr-1" />
              En cours
            </Badge>
          </div>
          
          <div className="text-sm text-gray-500">
            Période: {new Date(election.startDate).toLocaleDateString("fr-FR")} - {new Date(election.endDate).toLocaleDateString("fr-FR")}
          </div>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Participation</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">67.6%</p>
            <p className="text-sm text-green-600 mt-1">
              {election.votesCount} / {election.totalVoters} votants
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Votes exprimés</p>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{election.votesCount}</p>
            <p className="text-sm text-gray-500 mt-1">Tous valides</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Candidats</p>
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{candidates.length}</p>
            <p className="text-sm text-gray-500 mt-1">En compétition</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Preuves blockchain</p>
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-green-600 mt-1">Validées</p>
          </Card>
        </div>

        {/* Résultats détaillés */}
        <Card className="p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Classement des candidats</h3>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              Résultats en temps réel
            </Badge>
          </div>

          <div className="space-y-6">
            {candidates.map((candidate, index) => (
              <div 
                key={candidate.id}
                className={`border-2 rounded-xl p-6 transition-all ${
                  index === 0 
                    ? "border-yellow-400 bg-yellow-50/30" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* Rang */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? "bg-yellow-400 text-white" :
                    index === 1 ? "bg-gray-300 text-gray-700" :
                    "bg-orange-200 text-orange-700"
                  }`}>
                    <span className="text-2xl font-bold">#{candidate.rank}</span>
                  </div>

                  {/* Photo et nom */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-6xl">{candidate.photo}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-bold text-gray-900">{candidate.name}</h4>
                        {index === 0 && (
                          <Badge className="bg-yellow-500">
                            <Trophy className="w-3 h-3 mr-1" />
                            En tête
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{candidate.club}</p>
                    </div>
                  </div>

                  {/* Résultats */}
                  <div className="text-right min-w-[200px]">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {candidate.votes} votes
                    </div>
                    <div className="text-lg text-gray-600">{candidate.percentage}%</div>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mt-4">
                  <Progress 
                    value={candidate.percentage} 
                    className="h-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Graphique des résultats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition des votes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name, props) => [
                    `${value} votes`,
                    props.payload.fullName
                  ]}
                />
                <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Participation par club */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Participation par club
            </h3>
            <div className="space-y-4">
              {participationByClub.map((club) => (
                <div key={club.club}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{club.club}</span>
                    <span className="text-sm text-gray-600">
                      {club.participated} / {club.voters} ({club.rate}%)
                    </span>
                  </div>
                  <Progress value={club.rate} />
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">Moyenne générale</span>
                <span className="text-sm font-semibold text-gray-900">67.6%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Informations de transparence */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Informations de transparence et vérification
              </h3>
              <p className="text-sm text-gray-600">
                Ce scrutin est certifié par blockchain et vérifiable publiquement
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Smart Contract</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-gray-100 px-3 py-2 rounded font-mono flex-1">
                    {election.contractAddress}
                  </code>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(election.blockchainLink, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Preuve Zero Knowledge</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-gray-100 px-3 py-2 rounded font-mono flex-1">
                    {election.zkpHash}
                  </code>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Validée
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Votes anonymes garantis</p>
                  <p className="text-xs text-gray-600">Protection par Zero Knowledge Proof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Blockchain publique</p>
                  <p className="text-xs text-gray-600">Ethereum Mainnet - Vérifiable par tous</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Audit cryptographique</p>
                  <p className="text-xs text-gray-600">Intégrité vérifiée mathématiquement</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex items-center justify-center gap-4">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/transparency/${electionId}`)}
            >
              <Eye className="w-4 h-4" />
              Voir la page de transparence complète
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.open(election.blockchainLink, "_blank")}
            >
              <ExternalLink className="w-4 h-4" />
              Vérifier sur Etherscan
            </Button>
          </div>
        </Card>

        {/* Statistiques complémentaires */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Anonymat total</h4>
            <p className="text-xs text-gray-600">Protection cryptographique</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">⛓️</div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Immuabilité</h4>
            <p className="text-xs text-gray-600">Enregistré sur blockchain</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Vérifiable</h4>
            <p className="text-xs text-gray-600">Preuves mathématiques</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">👁️</div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Transparent</h4>
            <p className="text-xs text-gray-600">Audit public permanent</p>
          </Card>
        </div>
      </div>
    </div>
  );
}