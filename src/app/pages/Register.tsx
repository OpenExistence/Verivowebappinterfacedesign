import { useState } from "react";
import { Shield, Mail, Lock, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { useNavigate } from "react-router";
import { useAuth, UserRole } from "../contexts/AuthContext";
import { toast } from "sonner";
import logoIcon from "../../imports/image-0.png";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "voter" as UserRole,
    canVote: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    const success = await register(
      formData.email,
      formData.password,
      formData.name,
      formData.role,
      formData.canVote
    );

    setIsLoading(false);

    if (success) {
      toast.success("Compte créé avec succès !");
      // Rediriger selon le rôle
      if (formData.role === "organizer") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast.error("Cette adresse email est déjà utilisée");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src={logoIcon} alt="Verivo" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h1>
          <p className="text-gray-600">Rejoignez Verivo pour des élections sécurisées</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom complet */}
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Adresse email *</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jean.dupont@club.fr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <Label htmlFor="password">Mot de passe *</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 caractères</p>
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Type de compte */}
            <div>
              <Label>Type de compte *</Label>
              <div className="mt-3 space-y-3">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.role === "voter"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "voter" })}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      formData.role === "voter"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}>
                      {formData.role === "voter" && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Votant</h4>
                      <p className="text-sm text-gray-600">
                        Je souhaite uniquement participer aux votes organisés par ma fédération
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.role === "organizer"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "organizer" })}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      formData.role === "organizer"
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}>
                      {formData.role === "organizer" && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Organisateur</h4>
                      <p className="text-sm text-gray-600">
                        Je souhaite créer et gérer des scrutins pour ma fédération sportive
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Option pour les organisateurs */}
            {formData.role === "organizer" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="canVote"
                    checked={formData.canVote}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, canVote: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="canVote"
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Je souhaite également pouvoir voter
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      En tant qu'organisateur, vous pourrez aussi participer aux votes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bouton de soumission */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </Button>

            {/* Lien vers connexion */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Se connecter
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* Retour */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Informations de sécurité */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">Sécurisé</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">Crypté</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Confidentiel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
