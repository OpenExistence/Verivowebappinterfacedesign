import { useState } from "react";
import { 
  Shield, 
  Wallet, 
  CheckCircle, 
  Info, 
  Vote as VoteIcon,
  ExternalLink,
  Lock,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export function VoteInterface() {
  const navigate = useNavigate();
  const { electionId } = useParams();
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const election = {
    id: electionId,
    name: "Élection du Bureau Fédéral 2026",
    description: "Élection des membres du Bureau Fédéral pour le mandat 2026-2030",
    startDate: "2026-03-10T09:00:00",
    endDate: "2026-03-20T18:00:00",
    status: "active",
  };

  const candidates = [
    {
      id: 1,
      name: "Marie Dupont",
      position: "Présidente",
      club: "FC Paris Sport",
      description: "15 ans d'expérience dans la gestion sportive",
      photo: "👩‍💼",
    },
    {
      id: 2,
      name: "Jean Martin",
      position: "Président",
      club: "Olympique Lyon",
      description: "Ancien athlète de haut niveau, expert en gouvernance",
      photo: "👨‍💼",
    },
    {
      id: 3,
      name: "Sophie Bernard",
      position: "Présidente",
      club: "AS Monaco",
      description: "Spécialiste du développement fédéral",
      photo: "👩‍💼",
    },
  ];

  const connectWallet = async () => {
    // Simuler la connexion au wallet
    await new Promise(resolve => setTimeout(resolve, 1000));
    setWalletConnected(true);
    toast.success("Wallet connecté avec succès");
  };

  const submitVote = async () => {
    if (!selectedCandidate) {
      toast.error("Veuillez sélectionner un candidat");
      return;
    }

    // Simuler la transaction blockchain
    toast.info("Envoi du vote sur la blockchain...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockHash = "0x" + Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    
    setTransactionHash(mockHash);
    setHasVoted(true);
    toast.success("Vote enregistré avec succès!");
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
                  <h1 className="text-xl font-bold text-gray-900">Verivo</h1>
                  <p className="text-sm text-gray-500">Interface de vote sécurisé</p>
                </div>
              </div>
            </div>
            {walletConnected && (
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Wallet connecté
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {!hasVoted ? (
          <>
            {/* Informations sur l'élection */}
            <Card className="p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{election.name}</h2>
                  <p className="text-gray-600">{election.description}</p>
                </div>
                <Badge className="bg-green-600">
                  <VoteIcon className="w-3 h-3 mr-1" />
                  En cours
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Période de vote</p>
                    <p className="font-medium text-gray-900">
                      {new Date(election.startDate).toLocaleDateString("fr-FR")} - {new Date(election.endDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sécurité</p>
                    <p className="font-medium text-gray-900">Blockchain + ZKP</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Connexion wallet */}
            {!walletConnected ? (
              <Card className="p-8 text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Connectez votre wallet pour voter
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Utilisez MetaMask, Rabby ou tout autre wallet compatible Ethereum pour vous authentifier et voter de manière sécurisée.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button onClick={connectWallet} className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Connecter MetaMask
                  </Button>
                  <Button variant="outline" onClick={connectWallet} className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Connecter Rabby
                  </Button>
                </div>
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Votre vote est anonyme</p>
                      <p className="text-blue-700">
                        Grâce aux Zero Knowledge Proofs, votre identité et votre choix restent confidentiels 
                        tout en permettant la vérification de l'intégrité du scrutin.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <>
                {/* Liste des candidats */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sélectionnez votre candidat
                  </h3>
                  <div className="space-y-3">
                    {candidates.map((candidate) => (
                      <Card
                        key={candidate.id}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedCandidate === candidate.id
                            ? "border-blue-600 bg-blue-50 shadow-md"
                            : "hover:border-gray-400"
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedCandidate === candidate.id
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}>
                            {selectedCandidate === candidate.id && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="text-5xl">{candidate.photo}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.position} - {candidate.club}</p>
                            <p className="text-sm text-gray-500 mt-1">{candidate.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Bouton de vote */}
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Prêt à voter ?</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Votre vote sera enregistré de manière anonyme et immuable sur la blockchain. 
                        Vous recevrez une preuve cryptographique de validation.
                      </p>
                      {selectedCandidate && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-blue-900">
                            <span className="font-medium">Votre choix:</span>{" "}
                            {candidates.find(c => c.id === selectedCandidate)?.name}
                          </p>
                        </div>
                      )}
                      <Button 
                        onClick={submitVote} 
                        disabled={!selectedCandidate}
                        className="gap-2"
                        size="lg"
                      >
                        <VoteIcon className="w-4 h-4" />
                        Confirmer mon vote
                      </Button>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Informations de sécurité */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Anonymat garanti</h4>
                <p className="text-xs text-gray-600">Zero Knowledge Proof</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Vote immuable</h4>
                <p className="text-xs text-gray-600">Enregistré sur blockchain</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Vérifiable</h4>
                <p className="text-xs text-gray-600">Preuve cryptographique</p>
              </Card>
            </div>
          </>
        ) : (
          /* Confirmation de vote */
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vote enregistré avec succès !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre vote a été enregistré de manière anonyme et sécurisée sur la blockchain.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Détails de la transaction</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Hash de transaction</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-white px-3 py-2 rounded border font-mono flex-1 overflow-hidden text-ellipsis">
                        {transactionHash}
                      </code>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(transactionHash);
                            toast.success("Hash copié!");
                          } catch (error) {
                            toast.info("Hash: " + transactionHash);
                          }
                        }}
                      >
                        Copier
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmé sur la blockchain
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date et heure</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date().toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir sur Etherscan
                </Button>
                <Button 
                  className="gap-2"
                  onClick={() => navigate(`/results/${electionId}`)}
                >
                  Voir les résultats
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Vérification de votre vote</p>
                    <p className="text-blue-700">
                      Vous pouvez vérifier à tout moment que votre vote a été correctement comptabilisé 
                      en consultant la page de transparence du scrutin avec votre hash de transaction.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Anonymat préservé</h4>
                <p className="text-xs text-gray-600">Votre identité reste confidentielle</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl mb-2">⛓️</div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Immuable</h4>
                <p className="text-xs text-gray-600">Enregistré définitivement</p>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Vérifiable</h4>
                <p className="text-xs text-gray-600">Preuve cryptographique</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}