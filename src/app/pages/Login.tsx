import { useState } from "react";
import { Shield, Mail, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);

    const success = await login(formData.email, formData.password);

    setIsLoading(false);

    if (success) {
      toast.success("Connexion réussie !");
      // La redirection sera gérée par le composant parent
      navigate("/");
    } else {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre espace Verivo</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email">Adresse email</Label>
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
              <Label htmlFor="password">Mot de passe</Label>
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
            </div>

            {/* Mot de passe oublié */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={() => toast.info("Fonctionnalité à venir")}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Bouton de connexion */}
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>

            {/* Lien vers inscription */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Vous n'avez pas de compte ?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Créer un compte
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
        <div className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Connexion sécurisée</p>
                <p className="text-blue-700">
                  Vos identifiants sont protégés par cryptographie. 
                  Nous ne partageons jamais vos données personnelles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Démo rapide */}
        <div className="mt-6">
          <Card className="p-4 bg-gray-50">
            <p className="text-sm font-medium text-gray-900 mb-3">Compte de démonstration :</p>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Organisateur :</span>
                <code className="bg-white px-2 py-1 rounded">admin@demo.fr</code>
              </div>
              <div className="flex items-center justify-between">
                <span>Votant :</span>
                <code className="bg-white px-2 py-1 rounded">votant@demo.fr</code>
              </div>
              <div className="flex items-center justify-between">
                <span>Mot de passe :</span>
                <code className="bg-white px-2 py-1 rounded">demo123</code>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
