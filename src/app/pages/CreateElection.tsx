import { useState } from "react";
import { 
  Shield, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar, 
  FileText, 
  Upload, 
  Users,
  Rocket,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  UserPlus
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function CreateElection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "single",
    startDate: "",
    endDate: "",
    votersFile: null as File | null,
  });

  const [candidates, setCandidates] = useState<Array<{
    id: number;
    name: string;
    description: string;
  }>>([]);

  const [newCandidate, setNewCandidate] = useState({
    name: "",
    description: ""
  });

  const [manualVoters, setManualVoters] = useState<Array<{
    id: number;
    name: string;
    firstName: string;
    entity: string;
    email: string;
  }>>([]);

  const [newVoter, setNewVoter] = useState({
    name: "",
    firstName: "",
    entity: "",
    email: ""
  });

  const steps = [
    { number: 1, title: "Configuration", icon: FileText },
    { number: 2, title: "Import des votants", icon: Users },
    { number: 3, title: "Configuration du vote", icon: Rocket },
  ];

  const mockVoters = [
    { id: 1, name: "Martin Dubois", entity: "FC Paris Sport", email: "m.dubois@fcparis.fr" },
    { id: 2, name: "Sophie Laurent", entity: "Olympique Lyon", email: "s.laurent@ol.fr" },
    { id: 3, name: "Pierre Bernard", entity: "AS Monaco", email: "p.bernard@asm.fr" },
    { id: 4, name: "Julie Moreau", entity: "RC Strasbourg", email: "j.moreau@rcs.fr" },
    { id: 5, name: "Thomas Petit", entity: "Stade Rennais", email: "t.petit@srfc.fr" },
  ];

  const addCandidate = () => {
    if (!newCandidate.name) {
      toast.error("Veuillez renseigner le nom du candidat");
      return;
    }

    const candidate = {
      id: Date.now(),
      name: newCandidate.name,
      description: newCandidate.description
    };

    setCandidates([...candidates, candidate]);
    setNewCandidate({ name: "", description: "" });
    toast.success("Candidat ajouté avec succès");
  };

  const removeCandidate = (id: number) => {
    setCandidates(candidates.filter(c => c.id !== id));
    toast.success("Candidat supprimé");
  };

  const addManualVoter = () => {
    if (!newVoter.name || !newVoter.firstName || !newVoter.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const voter = {
      id: Date.now(),
      name: newVoter.name,
      firstName: newVoter.firstName,
      entity: newVoter.entity,
      email: newVoter.email
    };

    setManualVoters([...manualVoters, voter]);
    setNewVoter({ name: "", firstName: "", entity: "", email: "" });
    toast.success("Votant ajouté avec succès");
  };

  const removeManualVoter = (id: number) => {
    setManualVoters(manualVoters.filter(v => v.id !== id));
    toast.success("Votant supprimé");
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.startDate || !formData.endDate) {
        toast.error("Veuillez remplir tous les champs obligatoires");
        return;
      }
      if (candidates.length === 0) {
        toast.error("Veuillez ajouter au moins un candidat ou choix");
        return;
      }
    }
    if (step === 2) {
      if (!formData.votersFile && manualVoters.length === 0) {
        toast.error("Veuillez ajouter au moins un votant");
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      deployElection();
    }
  };

  const deployElection = async () => {
    setIsDeploying(true);
    
    // Simuler le déploiement
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success("Scrutin déployé avec succès sur la blockchain!");
    
    setTimeout(() => {
      navigate("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
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
                <h1 className="text-xl font-bold text-gray-900">Créer un nouveau scrutin</h1>
                <p className="text-sm text-gray-500">Assistant de création pas à pas</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step > s.number 
                      ? "bg-green-600 text-white" 
                      : step === s.number 
                      ? "bg-blue-900 text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {step > s.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className={`text-sm font-medium ${
                      step >= s.number ? "text-gray-900" : "text-gray-500"
                    }`}>
                      Étape {s.number}
                    </div>
                    <div className="text-xs text-gray-500">{s.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step > s.number ? "bg-green-600" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {/* Étape 1: Configuration */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration du scrutin</h2>
                <p className="text-gray-600">Définissez les paramètres généraux de l'élection</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du scrutin *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Élection du Bureau Fédéral 2026"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez les objectifs et le contexte de cette élection..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1.5"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type de scrutin</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1.5 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Scrutin uninominal (un seul choix)</option>
                    <option value="multiple">Scrutin plurinominal (plusieurs choix)</option>
                    <option value="ranked">Vote préférentiel (classement)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Date de début *</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Date de fin *</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                {/* Section Candidats/Choix */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidats et choix *</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Définissez les personnes ou choix qui peuvent être élus
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="candidateName">Nom du candidat ou choix *</Label>
                        <Input
                          id="candidateName"
                          placeholder="Ex: Marie Dupont, Option A, Liste 1..."
                          value={newCandidate.name}
                          onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="candidateDescription">Description (optionnel)</Label>
                        <Textarea
                          id="candidateDescription"
                          placeholder="Détails, fonction, programme..."
                          value={newCandidate.description}
                          onChange={(e) => setNewCandidate({ ...newCandidate, description: e.target.value })}
                          className="mt-1.5"
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={addCandidate}
                      className="gap-2"
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter ce candidat
                    </Button>
                  </div>

                  {/* Liste des candidats */}
                  {candidates.length > 0 && (
                    <div className="mt-4">
                      <Label>Candidats ajoutés ({candidates.length})</Label>
                      <div className="mt-2 space-y-2">
                        {candidates.map((candidate) => (
                          <div key={candidate.id} className="border rounded-lg p-4 flex items-start justify-between hover:bg-gray-50">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{candidate.name}</p>
                              {candidate.description && (
                                <p className="text-sm text-gray-600 mt-1">{candidate.description}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCandidate(candidate.id)}
                              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Conseil</p>
                    <p className="text-blue-700">
                      Prévoyez une période de vote suffisamment longue pour permettre à tous les représentants de participer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Import des votants */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Import des votants</h2>
                <p className="text-gray-600">Téléchargez un fichier ou ajoutez manuellement les personnes autorisées à voter</p>
              </div>

              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Import fichier CSV
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Ajout manuel
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-4 mt-6">
                  <div>
                    <Label>Fichier CSV des votants</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Cliquez pour télécharger ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        Format CSV avec colonnes: nom, prénom, email, entité
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setFormData({ ...formData, votersFile: new File([], "voters.csv") });
                          toast.success("Fichier importé avec succès");
                        }}
                      >
                        Choisir un fichier
                      </Button>
                    </div>
                  </div>

                  {formData.votersFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">
                          Fichier chargé avec succès
                        </p>
                        <p className="text-xs text-green-700">
                          {mockVoters.length} votants détectés
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Aperçu de la liste depuis le fichier */}
                  {formData.votersFile && (
                    <div>
                      <Label>Aperçu de la liste ({mockVoters.length} votants)</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Nom</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Entité</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Email</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">Statut</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {mockVoters.map((voter) => (
                              <tr key={voter.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{voter.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{voter.entity}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{voter.email}</td>
                                <td className="px-4 py-3 text-center">
                                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Valide
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="manual" className="space-y-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900">Ajouter un votant</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="voterName">Nom *</Label>
                        <Input
                          id="voterName"
                          placeholder="Dubois"
                          value={newVoter.name}
                          onChange={(e) => setNewVoter({ ...newVoter, name: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="voterFirstName">Prénom *</Label>
                        <Input
                          id="voterFirstName"
                          placeholder="Martin"
                          value={newVoter.firstName}
                          onChange={(e) => setNewVoter({ ...newVoter, firstName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="voterEntity">Entité</Label>
                        <Input
                          id="voterEntity"
                          placeholder="FC Paris Sport"
                          value={newVoter.entity}
                          onChange={(e) => setNewVoter({ ...newVoter, entity: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="voterEmail">Email *</Label>
                        <Input
                          id="voterEmail"
                          type="email"
                          placeholder="m.dubois@fcparis.fr"
                          value={newVoter.email}
                          onChange={(e) => setNewVoter({ ...newVoter, email: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={addManualVoter}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter ce votant
                    </Button>
                  </div>

                  {/* Liste des votants manuels */}
                  {manualVoters.length > 0 && (
                    <div>
                      <Label>Votants ajoutés ({manualVoters.length})</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Nom</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Prénom</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Entité</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Email</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {manualVoters.map((voter) => (
                              <tr key={voter.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{voter.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{voter.firstName}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{voter.entity || "-"}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{voter.email}</td>
                                <td className="px-4 py-3 text-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeManualVoter(voter.id)}
                                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-orange-900">
                  <p className="font-medium mb-1">Important</p>
                  <p className="text-orange-700">
                    Vérifiez attentivement la liste des votants. Une fois le scrutin déployé sur la blockchain, 
                    elle ne pourra plus être modifiée.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Déploiement */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration du vote</h2>
                <p className="text-gray-600">Vérifiez et confirmez le déploiement du scrutin</p>
              </div>

              {!isDeploying ? (
                <>
                  {/* Résumé */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold text-gray-900">Résumé du scrutin</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nom du scrutin</p>
                          <p className="font-medium text-gray-900">{formData.name || "Non défini"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-medium text-gray-900">
                            {formData.type === "single" && "Scrutin uninominal"}
                            {formData.type === "multiple" && "Scrutin plurinominal"}
                            {formData.type === "ranked" && "Vote préférentiel"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Période de vote</p>
                          <p className="font-medium text-gray-900">
                            {formData.startDate && formData.endDate
                              ? `${new Date(formData.startDate).toLocaleDateString("fr-FR")} - ${new Date(formData.endDate).toLocaleDateString("fr-FR")}`
                              : "Non définie"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nombre de votants</p>
                          <p className="font-medium text-gray-900">{mockVoters.length} votants</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nombre de candidats</p>
                          <p className="font-medium text-gray-900">{candidates.length} candidat{candidates.length > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>

                    {/* Opérations blockchain */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Opérations qui seront effectuées</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Création du smart contract</p>
                            <p className="text-xs text-gray-600">
                              Déploiement du contrat de vote sur Ethereum
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Distribution des droits de vote</p>
                            <p className="text-xs text-gray-600">
                              Génération des clés cryptographiques pour chaque votant
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Envoi des invitations</p>
                            <p className="text-xs text-gray-600">
                              Notification par email de tous les votants
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-green-900">
                        <p className="font-medium mb-1">Sécurité garantie</p>
                        <p className="text-green-700">
                          Le déploiement utilise des protocoles cryptographiques avancés (ZKP, MPC, HE) 
                          pour garantir l'anonymat et l'intégrité du vote.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Rocket className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Déploiement en cours...
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Veuillez patienter pendant que nous déployons votre scrutin sur la blockchain
                    </p>
                    <Progress value={66} className="max-w-md mx-auto" />
                  </div>

                  <div className="max-w-md mx-auto space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900">Smart contract créé</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900">Droits de vote distribués</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-900">Envoi des invitations...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1 || isDeploying}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Précédent
            </Button>
            <Button
              onClick={handleNext}
              disabled={isDeploying}
              className="gap-2"
            >
              {step === 3 ? (
                <>
                  <Rocket className="w-4 h-4" />
                  Déployer le scrutin
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}