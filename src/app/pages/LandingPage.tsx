import { Shield, CheckCircle, Lock, Eye, FileCheck, Users, ArrowRight, Vote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isOrganizer, user, logout } = useAuth();

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isOrganizer) {
      navigate("/admin");
    } else {
      navigate("/vote/1");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Verivo</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#solution" className="text-gray-600 hover:text-gray-900 transition-colors">
              Solution
            </a>
            <a href="#avantages" className="text-gray-600 hover:text-gray-900 transition-colors">
              Avantages
            </a>
            <a href="#securite" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sécurité
            </a>
            <Button variant="outline" onClick={() => navigate("/transparency/1")}>
              Vérifier un scrutin
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="outline" onClick={logout}>
                  Déconnexion
                </Button>
                <Button onClick={handleDashboardClick}>
                  {isOrganizer ? "Dashboard" : "Voter"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Connexion
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Créer un compte
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Vote électronique certifié blockchain</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            La confiance dans le vote,<br />
            <span className="text-blue-900">prouvée mathématiquement</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Verivo permet aux fédérations sportives françaises d'organiser des élections transparentes, 
            anonymes et vérifiables grâce à la blockchain et à la cryptographie avancée.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2" onClick={() => navigate("/admin/create-election")}>
              <Vote className="w-5 h-5" />
              Créer un scrutin
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate("/transparency/1")}>
              <Eye className="w-5 h-5" />
              Vérifier un scrutin
            </Button>
          </div>
        </div>

        {/* Illustration du processus */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Création</h3>
            <p className="text-sm text-gray-600">L'administrateur configure le scrutin</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Vote</h3>
            <p className="text-sm text-gray-600">Vote anonyme et crypté sur blockchain</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Vérification</h3>
            <p className="text-sm text-gray-600">Preuve cryptographique automatique</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Transparence</h3>
            <p className="text-sm text-gray-600">Résultats publics et vérifiables</p>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="bg-white py-20" id="probleme">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Le problème</h2>
              <p className="text-lg text-gray-600">
                Les scrutins traditionnels manquent de confiance et de transparence
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-red-200 bg-red-50/30">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Manque de confiance</h3>
                <p className="text-sm text-gray-600">
                  Les systèmes de vote actuels sont opaques et difficiles à vérifier
                </p>
              </Card>
              <Card className="p-6 border-red-200 bg-red-50/30">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Risques de fraude</h3>
                <p className="text-sm text-gray-600">
                  Impossibilité de prouver l'intégrité du processus électoral
                </p>
              </Card>
              <Card className="p-6 border-red-200 bg-red-50/30">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pas d'auditabilité</h3>
                <p className="text-sm text-gray-600">
                  Aucun moyen pour les participants de vérifier leur vote
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* La solution */}
      <section className="py-20" id="solution">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">La solution Verivo</h2>
              <p className="text-lg text-gray-600">
                Une plateforme de vote électronique basée sur des preuves mathématiques
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-blue-200 bg-blue-50/30">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain publique</h3>
                <p className="text-gray-600 mb-4">
                  Chaque vote est enregistré de manière immuable sur une blockchain publique, 
                  garantissant la traçabilité complète du scrutin.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Immutabilité des données</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transparence totale</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Vérification publique</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-blue-200 bg-blue-50/30">
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cryptographie avancée</h3>
                <p className="text-gray-600 mb-4">
                  Zero Knowledge Proof, MPC et chiffrement homomorphe garantissent 
                  l'anonymat tout en permettant la vérification.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Anonymat mathématique</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Preuves sans révélation</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Calculs chiffrés</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Les avantages */}
      <section className="bg-white py-20" id="avantages">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Les avantages Verivo</h2>
              <p className="text-lg text-gray-600">
                Un système de vote qui inspire confiance à tous les niveaux
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Vote anonyme</h3>
                <p className="text-sm text-gray-600">
                  Protection cryptographique de l'identité des votants
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Processus transparent</h3>
                <p className="text-sm text-gray-600">
                  Chaque étape visible et vérifiable publiquement
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-purple-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Résultats vérifiables</h3>
                <p className="text-sm text-gray-600">
                  Preuves mathématiques de l'intégrité du scrutin
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-7 h-7 text-orange-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Auditabilité complète</h3>
                <p className="text-sm text-gray-600">
                  Journal d'audit permanent et accessible
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sécurité */}
      <section className="py-20" id="securite">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sécurité de niveau institutionnel</h2>
              <p className="text-lg text-gray-600">
                Technologies cryptographiques de pointe pour garantir l'intégrité du vote
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-900 text-white rounded-lg p-6 mb-4">
                  <div className="text-3xl font-bold">ZKP</div>
                  <div className="text-sm opacity-90 mt-1">Zero Knowledge Proof</div>
                </div>
                <p className="text-sm text-gray-600">
                  Prouver la validité d'un vote sans révéler son contenu
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 text-white rounded-lg p-6 mb-4">
                  <div className="text-3xl font-bold">MPC</div>
                  <div className="text-sm opacity-90 mt-1">Multi-Party Computation</div>
                </div>
                <p className="text-sm text-gray-600">
                  Calcul distribué sans point central de défaillance
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-900 text-white rounded-lg p-6 mb-4">
                  <div className="text-3xl font-bold">HE</div>
                  <div className="text-sm opacity-90 mt-1">Homomorphic Encryption</div>
                </div>
                <p className="text-sm text-gray-600">
                  Comptage des votes sans déchiffrer les bulletins
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à organiser votre premier scrutin sécurisé ?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Rejoignez les fédérations sportives qui font confiance à Verivo 
              pour leurs élections démocratiques et transparentes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-2"
                onClick={() => navigate("/admin/create-election")}
              >
                Créer un scrutin
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => navigate("/transparency/1")}
              >
                Explorer un exemple
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">Verivo</span>
              </div>
              <p className="text-sm">
                La plateforme de vote électronique sécurisé pour les fédérations sportives françaises.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Guide de sécurité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Livre blanc</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2026 Verivo. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}